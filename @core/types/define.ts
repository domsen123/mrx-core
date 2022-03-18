import type { RouteRecordRaw, ThemeDefinition } from './client';

interface Theme {
  defaultTheme?: string;
  variations?: false | { colors: string[]; lighten: number; darken: number };
  themes?: Record<string, ThemeDefinition>;
}

export interface ClientSettings
  extends Record<string | number | symbol, unknown> {
  theme?: Theme;
}

export interface ClientDefinition {
  name: string;
  routes?: RouteRecordRaw[];
  plugins?: Promise<ClientDefinition>[];
  settings?: ClientSettings;
}

export interface PluginClientDefinition
  extends Omit<ClientDefinition, 'settings'> {}
