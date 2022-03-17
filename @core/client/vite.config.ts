import { dirname, resolve } from 'path';
import { createRequire } from 'module';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import ViteSsr from 'vite-ssr/plugin';

const require = createRequire(import.meta.url);
const entryRoot = dirname(require.resolve('@mrx/client'));

export default defineConfig({
  root: entryRoot,
  resolve: {
    alias: {
      'entry-src/': `${resolve(entryRoot, 'src')}/`,
    },
  },
  plugins: [
    ViteSsr({
      ssr: resolve(entryRoot, 'src/entry-server'),
      build: {
        clientOptions: {
          build: {
            emptyOutDir: true,
          },
        },
        serverOptions: {
          build: {
            emptyOutDir: true,
            ssr: resolve(entryRoot, 'src/entry-server'),
          },
        },
      },
    }),
    Vue(),
  ],
  optimizeDeps: {
    include: ['vue', 'vue-router'],
  },
});
