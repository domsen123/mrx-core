import { createRequire } from 'module';
import { dirname } from 'path';
import type { IncomingMessage, ServerResponse } from 'http';
import fastify from 'fastify';
import fastifyCompress from 'fastify-compress';
import fastifyStatic from 'fastify-static';
import middie from 'middie';
import { createSsrServer } from '@mrx/client';
import { appDist, getLogger } from '@mrx/server-utils';

const require = createRequire(import.meta.url);

const DEFAULT_API_PREFIX = '/_api';
const DEFAULT_PORT = 1337;

type NextFunction = (err?: any) => void;

export const startInstance = async (mode: 'dev' | 'prod') => {
  const apiPrefix = DEFAULT_API_PREFIX;
  const serverPort = DEFAULT_PORT;

  const app = fastify({
    logger: false,
  });
  await app.register(middie);
  getLogger().info(`MODE: ${mode}`);
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
        if (req.url!.startsWith(apiPrefix)) next();
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
        if (req.url!.startsWith(apiPrefix) || isAssetRequest) return next();
        if (req.method === 'GET') {
          const url = `http://${req.headers.host}${req.url}`;
          const context = await renderPage.default(url, {
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

    // const { ssr } = await import(`${appDist}/server/package.json`);
    // const manifest = await import(`${appDist}/client/ssr-manifest.json`);
    // const { default: renderPage } = await import(`${appDist}/server`);
  }

  try {
    // console.log(app.printRoutes());
    await app.listen(serverPort);
    getLogger().info(`👂 Server is listening on port ${serverPort}`);
  } catch (e: any) {
    console.error(e.message);
  }
};
