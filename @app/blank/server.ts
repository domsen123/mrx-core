import { defineServer } from '@mrx/server';
import pkg from './package.json';

export default defineServer(async () => ({
  name: `${pkg.name}-server`,
  settings: {},
}));
