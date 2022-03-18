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
  const server = await importIfExists<() => Promise<ServerDefinition>>(
    resolve(process.cwd(), 'server.ts'),
  );

  const { setSetting, getSetting } = useServerSettings();

  if (server) {
    const { endpoints, onReady } = await extendServer({
      server: server.default(),
    });
    for (const _onReady of onReady) {
      await _onReady();
    }
  }
  if (!getSetting('apiPrefix')) setSetting('apiPrefix', DEFAULT_API_PREFIX);
  if (!getSetting('serverPort')) setSetting('serverPort', DEFAULT_PORT);

  const app = fastify({
    logger: false,
  });
  await app.register(middie);
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
