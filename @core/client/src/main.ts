import app from 'app-root/index';
import { createInstance, extendClient, useStore } from '@mrx/utils';
import { createHead } from '@vueuse/head';
import type { Context } from '../types';

const { routes, setups } = await extendClient({ app: app() });

export const options = {
  routes,
};

export const main = async (ctx: Context) => {
  createInstance(ctx);
  Object.values(import.meta.globEager('./modules/*.ts')).map((i) =>
    i.install?.(ctx),
  );
  const store = useStore();
  const { isClient, request } = ctx;
  if (!isClient && request.auth) {
    store.setItem('currentAuth', request.auth);
    store.setItem('currentToken', request.token);
  }
  for (const setup of setups) {
    await setup(ctx);
  }

  const { app } = ctx;
  const head = createHead();
  app.use(head);
  return { head };
};
