import type { ServerDefinition, ServerSettings } from '@mrx/types';
import { getLogger, useServerSettings } from './serverUtils';

interface ExtendServerOptions {
  server: Promise<ServerDefinition>;
  endpoints?: any[];
  settings?: ServerSettings;
  onReady?: (() => Promise<void>)[];
}
export const extendServer = async (options: ExtendServerOptions) => {
  const { server, endpoints = [], onReady = [] } = options;
  const { settings = {} } = options;

  const {
    name,
    endpoints: _e = [],
    plugins: _p = [],
    settings: _s = {},
    onReady: _onReady,
  } = await server;
  getLogger().info(`🚀 Extending Server ${name}`);

  // apply endpoints
  _e.forEach((e) => endpoints.push(e));

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

  return { settings, endpoints, onReady };
};
