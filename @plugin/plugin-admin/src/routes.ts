import { defineAppRoutes } from '@mrx/utils';

export default defineAppRoutes([
  {
    path: '/admin',
    component: () => import('./layouts/AdminDashboard.vue'),
    meta: {
      needsAuth: true,
    },
    children: [
      {
        path: '',
        component: () => import('./pages/admin/Admin.vue'),
      },
    ],
  },
  {
    path: '/auth',
    component: () => import('./layouts/AuthLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('./pages/auth/SignIn.vue'),
      },
      {
        path: 'sign-up',
        component: () => import('./pages/auth/SignUp.vue'),
      },
      {
        path: 'reset-password',
        component: () => import('./pages/auth/ResetPassword.vue'),
      },
    ],
  },
]);
