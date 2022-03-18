import app from 'app-root/index';
import { extendClient } from '@mrx/utils';
import { createHead } from '@vueuse/head';
import type { Context } from '../types';

const { routes, setups } = await extendClient({ app: app() });

export const options = {
  routes,
};

export const main = async (ctx: Context) => {
  Object.values(import.meta.globEager('./modules/*.ts')).map((i) =>
    i.install?.(ctx),
  );

  for (const setup of setups) {
    await setup(ctx);
  }

  const { app } = ctx;
  const head = createHead();
  app.use(head);
  return { head };
};
