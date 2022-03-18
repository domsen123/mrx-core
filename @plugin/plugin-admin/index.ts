import { definePlugin } from '@mrx/utils';
import pkg from './package.json';
import routes from './src/routes';

export default definePlugin(async () => ({
  name: pkg.name,
  routes,
}));
