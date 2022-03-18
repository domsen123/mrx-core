import type { RouteRecordRaw } from './client';

export interface ClientDefinition {
  name: string;
  routes?: RouteRecordRaw[];
  plugins?: Promise<ClientDefinition>[];
  settings?: any;
}

export interface PluginClientDefinition
  extends Omit<ClientDefinition, 'settings'> {}
