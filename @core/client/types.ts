import type { Router } from 'vue-router';
import type { Context as Ctx } from 'vite-ssr/vue';
import type { App } from 'vue';

export interface Context extends Ctx {
  router: Router;
}

export { App, Router };
