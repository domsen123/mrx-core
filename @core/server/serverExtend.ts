import type { Resource, ServerDefinition, ServerSettings } from '@mrx/types';
import { getLogger, useServerSettings } from './serverUtils';

interface ExtendServerOptions {
  server: Promise<ServerDefinition>;
  endpoints?: any[];
  settings?: ServerSettings;
  resources?: Resource[];
  // onReady?: ((definition: ServerDefinition) => Promise<void>)[];
  onReady?: any[];
}
export const extendServer = async (options: ExtendServerOptions) => {
  const { server, endpoints = [], onReady = [], resources = [] } = options;
  const { settings = {} } = options;

  const definition = await server;
  const {
    name,
    endpoints: _e = [],
    plugins: _p = [],
    settings: _s = {},
    resources: _r = [],
    onReady: _onReady,
  } = definition;
  getLogger().info(`🚀 Extending Server ${name}`);

  // apply endpoints
  _e.forEach((e) => endpoints.push(e));

  // apply resources
  _r.forEach((r) => resources.push(r));

  // set settings
  Object.keys(_s).forEach((key) => {
    // @ts-expect-error ...
    useServerSettings().setSetting(key, _s[key]);
  });

  // apply ready hooks
  if (_onReady) onReady.push(_onReady);

  // apply plugins
  for (const p of _p) {
    await extendServer({ server: p, endpoints, onReady });
  }

  return { settings, endpoints, onReady, resources };
};
