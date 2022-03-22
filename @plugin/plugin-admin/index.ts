import { definePlugin, useStore } from '@mrx/utils';
import pkg from './package.json';
import routes from './src/routes';
import * as Layouts from './src/layouts';
export { useAuth } from './src/services';

export default definePlugin(async () => ({
  name: pkg.name,
  routes,
  setup: async ({ app, router }) => {
    const store = useStore();
    // Todo: Make this via vite plugin?! Auto Resolve?!
    app.component('TestLayout', Layouts.MrxPluginAdminTestLayout);
    app.component('AdminDashboard', Layouts.AdminDashboard);
    app.component('AuthLayout', Layouts.AuthLayout);

    router.beforeEach((to) => {
      if (to.meta.needsAuth) {
        const user = store.getItem('currentAuth');
        if (!user) return `/auth?source=${to.fullPath}`;
      }
    });
    return Promise.resolve();
  },
}));
