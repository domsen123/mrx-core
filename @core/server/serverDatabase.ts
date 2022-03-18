import knex from 'knex';
import type { Knex } from 'knex';
import { useServerSettings } from './serverUtils';

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
