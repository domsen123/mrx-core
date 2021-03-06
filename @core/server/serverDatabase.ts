import knex from 'knex';
import type { Knex } from 'knex';
import { dayjs, getLogger, useServerSettings, uuidv4 } from './serverUtils';

let __instance: Knex | undefined;

export const getDatabase = () => {
  const { getSetting } = useServerSettings();
  if (!__instance) {
    const config = getSetting('database');
    if (!config) {
      throw new Error(
        `Please define database settings in server.ts (defineServer)!`,
      );
    }
    __instance = knex(config);
  }
  return __instance;
};

export const createTable = async ({
  db = getDatabase(),
  table_name,
  cb,
  force = false,
}: {
  db?: Knex;
  table_name: string;
  cb: (table: Knex.TableBuilder) => void;
  force?: boolean;
}) => {
  const tableExists = await db.schema.hasTable(table_name);
  if (tableExists && force) {
    getLogger().warn(`⚠️ Force table re-creation is used ⚠️`);
    await db.schema.dropTable(table_name);
  }

  await db.schema.createTable(table_name, (table) => {
    table.uuid('uuid').notNullable();
    cb(table);
    table.timestamp('created_at').notNullable();
    table.timestamp('updated_at').notNullable();
    table.uuid('created_by').notNullable();
    table.uuid('updated_by').notNullable();
  });
};

export const createResourceTable = async ({
  db = getDatabase(),
  resource,
  force = false,
}: {
  resource: any;
  db?: Knex;
  force?: boolean;
}) => {
  const { schema } = resource;
  await createTable({
    db,
    table_name: resource.name,
    force,
    cb: (table) => {
      Object.keys(schema.properties).forEach((columnName) => {
        const type = schema.properties[columnName].type;
        const format = schema.properties[columnName].format ?? '';
        // let column: Knex.ColumnBuilder | undefined;
        if (['string'].includes(type)) {
          if (format === 'uuid') table.uuid(columnName);
          else table.string(columnName);
        }
        if (['number', 'integer'].includes(type)) {
          table.integer(columnName);
        }
        if (['boolean'].includes(type)) {
          table.integer(columnName);
        }
      });
    },
  });
};

export const toCreateItem = <T = any>(item: T, author: string | true) => {
  const uuid = uuidv4();

  const created_by = author === true ? uuid : author;
  const updated_by = created_by;

  const created_at = dayjs().toDate();
  const updated_at = created_at;

  return {
    uuid,
    ...item,
    created_at,
    updated_at,
    created_by,
    updated_by,
  };
};

export const toUpdateItem = <T = any>(item: T, editor: string) => {
  const updated_by = editor;
  const updated_at = dayjs().toDate();

  if ((item as any).uuid) Reflect.deleteProperty(item as any, 'uuid');

  return {
    ...item,
    updated_by,
    updated_at,
  };
};
