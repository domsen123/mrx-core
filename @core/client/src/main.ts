import { createHead } from '@vueuse/head';

export const options = {
  routes: [
    {
      path: '/',
      component: () => import('./Page.vue'),
    },
  ],
};

export const main = async (ctx: any) => {
  const { app } = ctx;
  const head = createHead();
  app.use(head);
  return { head };
};
