import type {
  ClientDefinition,
  ClientSettings,
  RouteRecordRaw,
} from '@mrx/types';
import { getLogger } from './logger';

interface ExtendClientOptions {
  app: Promise<ClientDefinition>;
  routes?: RouteRecordRaw[];
  settings?: ClientSettings;
}
export const extendClient = async (options: ExtendClientOptions) => {
  const { app, routes = [] } = options;
  let { settings = {} } = options;

  const {
    name,
    routes: _r = [],
    plugins: _p = [],
    settings: _s = {},
  } = await app;
  getLogger().info(`Extending ${name}`);

  // apply routes
  _r.forEach((r) => routes.push(r));

  settings = Object.assign(settings, _s);

  // apply settings
  for (const p of _p) {
    await extendClient({ app: p, routes });
  }
  return { routes, settings };
};
