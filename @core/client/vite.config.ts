import { dirname, resolve } from 'path';
import { createRequire } from 'module';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import ViteSsr from 'vite-ssr/plugin';
import Vuetify from '@vuetify/vite-plugin';
import Icons from 'unplugin-icons/vite';
import Components from 'unplugin-vue-components/vite';
import IconsResolver from 'unplugin-icons/resolver';
import AutoImport from 'unplugin-auto-import/vite';
import { getRouteInformation } from '@mrx/server';

const require = createRequire(import.meta.url);

const clientRoot = dirname(require.resolve('@mrx/client'));
const clientSrc = resolve(clientRoot, 'src');
const appRoot = process.cwd();
const requireApp = createRequire(appRoot);
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
      getRenderContext: async (ctx) => {
        return {
          status: 200,
          initialState: {
            pageInfo: await getRouteInformation(ctx),
          },
        };
      },
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
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core'],
      dts: resolve(appRoot, 'auto-imports.d.ts'),
    }),
    Components({
      resolvers: [IconsResolver()],
    }),
    Icons(),
  ],
  optimizeDeps: {
    include: ['vue', 'vue-router', 'vuetify'],
    exclude: ['vue-demi'],
  },
});
