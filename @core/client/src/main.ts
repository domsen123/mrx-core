import { createHead } from '@vueuse/head';
import type { Context } from '../types';

export const options = {
  routes: [
    {
      path: '/',
      component: () => import('./Page.vue'),
    },
  ],
};

export const main = async (ctx: Context) => {
  Object.values(import.meta.globEager('./modules/*.ts')).map((i) =>
    i.install?.(ctx),
  );

  const { app } = ctx;
  const head = createHead();
  app.use(head);
  return { head };
};
