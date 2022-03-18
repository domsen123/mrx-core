import { defineApp, defineAppRoutes } from '@mrx/utils';
import pkg from './package.json';

export default defineApp(async () => ({
  name: pkg.name,
  routes: defineAppRoutes([
    {
      path: '/',
      component: () => import('~/pages/Home.vue'),
    },
  ]),
}));
