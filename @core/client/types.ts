import type { RouteRecordRaw, Router } from 'vue-router';
import type { Context as Ctx } from 'vite-ssr/vue';
import type { ThemeDefinition } from 'vuetify';
import type { App, Component, PropType } from 'vue';

export interface Context extends Ctx {
  router: Router;
}

export { App, Component, Router, RouteRecordRaw, ThemeDefinition, PropType };
