import { resolve } from 'path';
import {
  __dirname,
  defineServerPlugin,
  getDatabase,
  setServerLocator,
} from '@mrx/server';
import resources from './server/resources';
import endpoints from './server/endpoints';
import pkg from './package.json';
import { AuthServerService } from './server/services';
import { useMiddleware } from './server/middlewares/is-auth.middleware';

export default defineServerPlugin(async () => {
  return {
    name: `${pkg.name}-server`,
    endpoints,
    resources,
    onReady: async ({ app }) => {
      setServerLocator('auth', new AuthServerService());
      app.use(useMiddleware);

      const root = __dirname(import.meta.url);
      const migrationsDir = resolve(root, 'server/database/migrations');
      const seedDir = resolve(root, 'server/database/seeds');
      const db = getDatabase();
      await db.migrate.rollback({
        directory: migrationsDir,
      });
      await db.migrate.latest({
        directory: migrationsDir,
      });
      await db.seed.run({
        directory: seedDir,
      });
    },
  };
});
