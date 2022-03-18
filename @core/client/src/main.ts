import app from 'app-root/index';
import { extendClient, useClientSettings } from '@mrx/utils';
import { createHead } from '@vueuse/head';
import type { Context } from '../types';

const { routes, settings } = await extendClient({ app: app() });
useClientSettings().setSettings(settings);

export const options = {
  routes,
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
