import { dirname, resolve } from 'path';
import { createRequire } from 'module';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import ViteSsr from 'vite-ssr/plugin';
import Vuetify from '@vuetify/vite-plugin';
import { appSrc } from '@mrx/utils';

const require = createRequire(import.meta.url);
const clientRoot = dirname(require.resolve('@mrx/client'));

export default defineConfig({
  root: clientRoot,
  resolve: {
    alias: {
      '~/': `${appSrc}/`,
      'client-src/': `${resolve(clientRoot, 'src')}/`,
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
    Vuetify({ styles: 'expose', autoImport: false }),
  ],
  optimizeDeps: {
    include: ['vue', 'vue-router', 'vuetify'],
  },
});
