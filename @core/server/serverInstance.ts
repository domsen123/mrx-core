import { resolve } from 'path';
import type { RouteOptions } from 'fastify';
import fastify from 'fastify';
import middie from 'middie';
import { extendServer, getLogger, importIfExists } from '@mrx/server';
import type { Resource, ServerDefinition, ServerSettings } from '@mrx/types';
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

  let __endpoints: RouteOptions[] = [];
  let __resources: Resource[] = [];
  let __settings: ServerSettings = {};
  let __onReady: any[] = [];

  if (server) {
    const { endpoints, onReady, resources, settings } = await extendServer({
      server: server.default(),
    });

    __endpoints = endpoints;
    __resources = resources;
    __onReady = onReady;
    __settings = settings;
  }

  // Set default settings
  if (!getSetting('apiPrefix')) setSetting('apiPrefix', DEFAULT_API_PREFIX);
  if (!getSetting('serverPort')) setSetting('serverPort', DEFAULT_PORT);
  // Call every onReady Hook on App/Plugins
  for (const onReady of __onReady) {
    await onReady({
      resources: __resources,
      endpoints: __endpoints,
      settings: __settings,
      app,
    });
  }

  // Setup every endpoint from App/Plugins
  for (const endpoint of __endpoints) {
    await app.route({
      ...endpoint,
      url: `${getSetting('apiPrefix')}${endpoint.url}`,
    });
  }

  for (const resource of __resources) {
    // TODO
  }

  // Render SSR Application
  await renderRequest(app, mode);

  try {
    await app.listen(getSetting('serverPort'));
    getLogger().info(
      `???? Server is listening on port ${getSetting('serverPort')}`,
    );
    // eslint-disable-next-line no-console
    console.log(app.printRoutes());
  } catch (e: any) {
    console.error(e.message);
  }
};
