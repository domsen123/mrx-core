// import '~/assets/scss/vuetify.scss';
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
  settings: {
    theme: {
      defaultTheme: 'light',
      light: {
        dark: false,
        colors: {
          primary: '#0E185F',
          secondary: '#2FA4FF',
        },
      },
    },
  },
}));
