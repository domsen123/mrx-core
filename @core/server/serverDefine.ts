import type {
  RouteHandler,
  ServerDefinition,
  ServerPluginDefinition,
} from '@mrx/types';

export const defineServer = (
  fn: () => Promise<ServerDefinition>,
): (() => Promise<ServerDefinition>) => fn;
export const defineServerPlugin = (
  fn: () => Promise<ServerPluginDefinition>,
): (() => Promise<ServerPluginDefinition>) => fn;

export const defineMiddleware = (fn: RouteHandler) => fn;
