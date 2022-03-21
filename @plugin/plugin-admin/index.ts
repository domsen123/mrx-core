import { definePlugin, useStore } from '@mrx/utils';
import pkg from './package.json';
import routes from './src/routes';
export { useAuth } from './src/services';

export default definePlugin(async () => ({
  name: pkg.name,
  routes,
  setup: async ({ router }) => {
    const store = useStore();
    router.beforeEach((to) => {
      if (to.meta.needsAuth) {
        const user = store.getItem('currentAuth');
        if (!user) return `/auth?source=${to.fullPath}`;
      }
    });
    return Promise.resolve();
  },
}));
