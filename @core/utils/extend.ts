import type {
  ClientDefinition,
  ClientSettings,
  Context,
  RouteRecordRaw,
} from '@mrx/types';
import { getLogger } from './logger';
import { useClientSettings } from './settings';

interface ExtendClientOptions {
  app: Promise<ClientDefinition>;
  routes?: RouteRecordRaw[];
  settings?: ClientSettings;
  setups?: ((ctx: Context) => Promise<void>)[];
}
export const extendClient = async (options: ExtendClientOptions) => {
  const { app, routes = [], setups = [] } = options;

  const {
    name,
    routes: _r = [],
    plugins: _p = [],
    settings: _s = {},
    setup: _setup,
  } = await app;
  getLogger().info(`🚀 Extending Client ${name}`);

  // apply routes
  _r.forEach((r) => routes.push(r));

  // set settings
  Object.keys(_s).forEach((key) =>
    // @ts-expect-error ...
    useClientSettings().setSetting(key, _s[key]),
  );

  if (_setup) setups.push(_setup);

  // apply plugins
  for (const p of _p) {
    await extendClient({ app: p, routes, setups });
  }
  return { routes, setups };
};
