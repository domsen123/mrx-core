import type { RouteRecordRaw } from './client';

export interface ClientSettings
  extends Record<string | number | symbol, unknown> {}

export interface ClientDefinition {
  name: string;
  routes?: RouteRecordRaw[];
  plugins?: Promise<ClientDefinition>[];
  settings?: ClientSettings;
}

export interface PluginClientDefinition
  extends Omit<ClientDefinition, 'settings'> {}
