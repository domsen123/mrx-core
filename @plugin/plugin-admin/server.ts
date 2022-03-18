import { resolve } from 'path';
import { __dirname, defineServerPlugin, getDatabase } from '@mrx/server';
import resources from './server/resources';
import pkg from './package.json';

export default defineServerPlugin(async () => {
  return {
    name: `${pkg.name}-server`,
    resources,
    onReady: async () => {
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
