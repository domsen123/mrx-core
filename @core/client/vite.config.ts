import { dirname, resolve } from 'path';
import { createRequire } from 'module';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import ViteSsr from 'vite-ssr/plugin';
import Vuetify from '@vuetify/vite-plugin';

const require = createRequire(import.meta.url);
const clientRoot = dirname(require.resolve('@mrx/client'));
const clientSrc = resolve(clientRoot, 'src');
const appRoot = process.cwd();
const appSrc = resolve(appRoot, 'src');

export default defineConfig({
  root: clientRoot,
  resolve: {
    alias: {
      '~/': `${appSrc}/`,
      'app-root/': `${appRoot}/`,
      'client-src/': `${clientSrc}/`,
    },
  },
  plugins: [
    ViteSsr({
      ssr: resolve(clientRoot, 'src/entry-server'),
      build: {
        clientOptions: {
          build: {
            target: 'esnext',
            emptyOutDir: true,
          },
        },
        serverOptions: {
          build: {
            emptyOutDir: true,
            ssr: resolve(clientRoot, 'src/entry-server'),
            target: 'esnext',
            rollupOptions: {
              output: {
                format: 'esm',
              },
            },
          },
        },
      },
    }),
    Vue(),
    Vuetify({ autoImport: false }),
  ],
  optimizeDeps: {
    include: ['vue', 'vue-router', 'vuetify'],
  },
});
