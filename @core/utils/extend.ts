import type { ClientDefinition, RouteRecordRaw } from '@mrx/types';

interface ExtendClientOptions {
  app: Promise<ClientDefinition>;
  routes?: RouteRecordRaw[];
}
export const extendClient = async (options: ExtendClientOptions) => {
  const { app, routes = [] } = options;

  const { routes: _r = [], plugins: _p = [] } = await app;
  // apply routes
  _r.forEach((r) => routes.push(r));
  for (const p of _p) {
    await extendClient({ app: p, routes });
  }
  return { routes };
};
