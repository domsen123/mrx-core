import type { ClientDefinition, RouteRecordRaw } from '@mrx/types';
import { getLogger } from './logger';

interface ExtendClientOptions {
  app: Promise<ClientDefinition>;
  routes?: RouteRecordRaw[];
}
export const extendClient = async (options: ExtendClientOptions) => {
  const { app, routes = [] } = options;
  const { name, routes: _r = [], plugins: _p = [] } = await app;
  getLogger().info(`Extending ${name}`);

  // apply routes
  _r.forEach((r) => routes.push(r));
  for (const p of _p) {
    await extendClient({ app: p, routes });
  }
  return { routes };
};
