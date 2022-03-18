import { defineApp, defineAppRoutes } from '@mrx/utils';
import AdminPlugin from '@mrx/plugin-admin';
import pkg from './package.json';

export default defineApp(async () => ({
  name: pkg.name,
  routes: defineAppRoutes([
    {
      path: '/',
      component: () => import('~/pages/Home.vue'),
    },
  ]),
  plugins: [AdminPlugin()],
}));
