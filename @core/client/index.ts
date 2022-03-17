import type { UserConfigExport } from 'vite';
import { mergeConfig } from 'vite';
import { createSsrServer } from 'vite-ssr/dev';
import build from 'vite-ssr/build';
import mainConfig from './vite.config';

export { createSsrServer, build };

export const defineConfig = (config: UserConfigExport) =>
  mergeConfig(config, mainConfig);
