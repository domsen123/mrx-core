import { resolve } from 'path';
import { Command } from 'commander';
import dotenv from 'dotenv';
import { build } from '@mrx/client';
import { getLogger } from '@mrx/utils';
import { restartInitializer } from './watcher';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const path = resolve(process.cwd(), '.env');
dotenv.config({ path });

const commander = new Command();

/**
 * Handle the CLI using Commander
 * Set up initial Node environment
 */
export const execute = async (): Promise<void> => {
  commander.command('test').action(async () => {
    getLogger().info(`TEST TEST TEST`);
  });
  commander.command('dev').action(async () => {
    process.env.NODE_ENV = 'development';
    restartInitializer();
  });
  commander.command('start').action(async () => {
    process.env.NODE_ENV = process.env.NODE_ENV ?? 'production';
    const { startInstance } = await import('@mrx/server');
    const mode = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';
    await startInstance(mode);
  });
  commander.command('build').action(async () => {
    process.env.NODE_ENV = process.env.NODE_ENV ?? 'production';
    await build();
    getLogger().info('👌 Build Done!');
  });

  commander.command('build:watch').action(async () => {
    restartInitializer('build');
  });
  commander.command('build:watch:start').action(async () => {
    restartInitializer('build && pnpm exec mrx start');
  });

  commander.parse(process.argv);
};
