import { defineAppRoutes } from '@mrx/utils';

export default defineAppRoutes([
  {
    path: '/admin',
    component: () => import('./pages/admin/Admin.vue'),
  },
]);
