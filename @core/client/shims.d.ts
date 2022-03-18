import type { Component } from 'vue';
import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    state?: any;
    layout?: () => Promise<Component>;
    needsAuth?: boolean;
  }
}
