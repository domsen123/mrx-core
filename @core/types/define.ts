import type { RouteRecordRaw, ThemeDefinition } from './client';
import type { Knex } from './server';

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
}

export interface PluginClientDefinition
  extends Omit<ClientDefinition, 'settings'> {}
/* #endregion */

/* #region  Server Types */
export interface ServerSettings {
  database?: Knex.Config;
}

export interface ServerDefinition {
  name: string;
  plugins?: Promise<ServerPluginDefinition>;
  settings?: ServerSettings;
}
export interface ServerPluginDefinition
  extends Omit<ServerDefinition, 'settings'> {}
/* #endregion */
