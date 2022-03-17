import type { Router } from 'vue-router';
import type { Context as Ctx } from 'vite-ssr/vue';

export interface Context extends Ctx {
  router: Router;
}
