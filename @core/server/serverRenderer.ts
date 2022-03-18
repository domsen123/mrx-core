import type { IncomingMessage, ServerResponse } from 'http';
import { dirname } from 'path';
import { createRequire } from 'module';
import { createSsrServer } from '@mrx/client';
import type { FastifyInstance } from 'fastify';
import fastifyCompress from 'fastify-compress';
import fastifyStatic from 'fastify-static';
import { appDist, useServerSettings } from './serverUtils';

const require = createRequire(import.meta.url);

type NextFunction = (err?: any) => void;

export const renderRequest = async (
  app: FastifyInstance,
  mode: 'dev' | 'prod',
) => {
  const { getSetting } = useServerSettings();
  if (mode === 'dev') {
    const root = dirname(require.resolve('@mrx/client'));
    const vite = await createSsrServer({
      root,
      server: {
        middlewareMode: 'ssr',
      },
    });
    app.use(
      async (req: IncomingMessage, res: ServerResponse, next: NextFunction) => {
        if (req.url!.startsWith(getSetting('apiPrefix'))) next();
        else vite.middlewares(req, res, next);
      },
    );
  } else {
    app.register(fastifyCompress);
    app.register(fastifyStatic, {
      root: `${appDist}/client`,
    });
    // static assets (real assets)
    app.register(fastifyStatic, {
      root: `${appDist}/client/assets`,
      prefix: '/assets/',
      decorateReply: false,
    });
    const {
      default: { ssr },
    } = await import(`${appDist}/server/package.json`);

    const { default: manifest } = await import(
      `${appDist}/client/ssr-manifest.json`
    );

    const { default: renderPage } = await import(`${appDist}/server`);

    app.use(
      async (req: IncomingMessage, res: ServerResponse, next: NextFunction) => {
        const isAssetRequest = ssr.assets.some((asset: string) =>
          req.url!.substring(1, req.url!.length).startsWith(asset),
        );
        if (req.url!.startsWith(getSetting('apiPrefix')) || isAssetRequest)
          return next();
        if (req.method === 'GET') {
          const url = `http://${req.headers.host}${req.url}`;
          const context = await renderPage(url, {
            manifest,
            preload: true,
            request: req,
            response: res,
            initialState: {},
          });
          res.writeHead(200, { 'Content-Type': 'text/html' });
          return res.end(context.html);
        } else {
          // Todo: 404 // 501 ?
          next();
        }
      },
    );
  }
};
