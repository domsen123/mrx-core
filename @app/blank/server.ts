import { defineServer } from '@mrx/server';
import AdminPluginServer from '@mrx/plugin-admin/server';
import pkg from './package.json';

export default defineServer(async () => ({
  name: `${pkg.name}-server`,
  settings: {
    database: {
      client: 'pg',
      connection: {
        host: 'localhost',
        database: 'mrx_core',
        user: 'db_root',
        password: 'db_root',
      },
    },
  },
  plugins: [AdminPluginServer()],
}));
