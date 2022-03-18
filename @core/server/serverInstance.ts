import { resolve } from 'path';
import fastify from 'fastify';
import middie from 'middie';
import { extendServer, getLogger, importIfExists } from '@mrx/server';
import type { ServerDefinition } from '@mrx/types';
import { renderRequest } from './serverRenderer';
import { useServerSettings } from './serverUtils';

const DEFAULT_API_PREFIX = '/_api';
const DEFAULT_PORT = 1337;

export const startInstance = async (mode: 'dev' | 'prod') => {
  const { setSetting, getSetting } = useServerSettings();

  // Create Fastify Instance
  const app = fastify({
    logger: false,
  });
  // Add middleware functionality
  await app.register(middie);

  // Extend Server (Application & Plugins)
  const server = await importIfExists<() => Promise<ServerDefinition>>(
    resolve(process.cwd(), 'server.ts'),
  );

  if (server) {
    const { endpoints, onReady, resources } = await extendServer({
      server: server.default(),
    });

    // Call every onReady Hook on App/Plugins
    for (const _onReady of onReady) {
      await _onReady;
    }

    // Setup every endpoint from App/Plugins
    for (const endpoint of endpoints) {
      await app.route(endpoint);
    }

    for (const resource of resources) {
      // TODO
    }
  }

  // Set default settings
  if (!getSetting('apiPrefix')) setSetting('apiPrefix', DEFAULT_API_PREFIX);
  if (!getSetting('serverPort')) setSetting('serverPort', DEFAULT_PORT);

  // Render SSR Application
  await renderRequest(app, mode);

  try {
    // console.log(app.printRoutes());
    await app.listen(getSetting('serverPort'));
    getLogger().info(
      `👂 Server is listening on port ${getSetting('serverPort')}`,
    );
  } catch (e: any) {
    console.error(e.message);
  }
};
