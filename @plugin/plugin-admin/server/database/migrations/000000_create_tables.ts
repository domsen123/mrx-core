import type { Knex } from '@mrx/server';
import { createResourceTable } from '@mrx/server';
import resources from '../../resources';

export async function up(knex: Knex): Promise<void> {
  for (const resource of resources) {
    await createResourceTable({
      db: knex,
      resource,
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  for (const resource of resources) {
    await knex.schema.dropTableIfExists(resource.name);
  }
}
