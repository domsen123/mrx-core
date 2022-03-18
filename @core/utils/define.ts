import type {
  ClientDefinition,
  PluginClientDefinition,
  RouteRecordRaw,
} from '@mrx/types';

export const defineApp = (
  fn: () => Promise<ClientDefinition>,
): (() => Promise<ClientDefinition>) => fn;
export const definePlugin = (
  fn: () => Promise<PluginClientDefinition>,
): (() => Promise<PluginClientDefinition>) => fn;

export const defineAppRoutes = (r: RouteRecordRaw[]) => r;
