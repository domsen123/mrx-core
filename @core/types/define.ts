import type { TObject } from '@sinclair/typebox';
import type { Context, RouteRecordRaw, ThemeDefinition } from './client';
import type { Knex, RouteOptions } from './server';
/* #region  Client Types */
interface Theme {
  defaultTheme?: string;
  variations?: false | { colors: string[]; lighten: number; darken: number };
  themes?: Record<string, ThemeDefinition>;
}

export interface ClientSettings {
  theme?: Theme;
}

export interface ClientDefinition {
  name: string;
  routes?: RouteRecordRaw[];
  plugins?: Promise<PluginClientDefinition>[];
  settings?: ClientSettings;
  setup?: (ctx: Context) => Promise<void>;
}

export interface PluginClientDefinition
  extends Omit<ClientDefinition, 'settings'> {}
/* #endregion */

/* #region  Server Types */
export interface ServerSettings {
  database?: Knex.Config;
  serverPort?: number;
  apiPrefix?: string;
}

export interface Resource {
  name: string;
  schema: TObject<any>;
}

export interface ServerDefinition {
  name: string;
  endpoints?: RouteOptions[];
  plugins?: Promise<ServerPluginDefinition>[];
  settings?: ServerSettings;
  resources?: Resource[];
  onReady?: (definition: ServerDefinition) => Promise<void>;
}
export interface ServerPluginDefinition
  extends Omit<ServerDefinition, 'settings'> {}
/* #endregion */
