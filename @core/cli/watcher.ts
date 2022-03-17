import { getLogger } from '@mrx/client-utils';

export const restartInitializer = async (command = 'start') => {
  const { default: nodemon } = await import('nodemon');
  nodemon({
    verbose: true,
    exec: `pnpm exec mrx ${command}`,
    cwd: process.cwd(),
    watch: [process.cwd()],
    ignore: ['*.d.ts', '**/dist/*', '**/*.vue', '**/@mrx/client/src/**'],
    ignoreRoot: ['.git', 'node_modules/!(@mrx)/**/*'],
    ext: 'ts',
  });
  nodemon
    .on('restart', (files: string[]) => {
      getLogger().info(`Restart: %o`, files);
    })
    .on('quit', () => {
      getLogger().info(`Stop!`);
      process.exit(0);
    });
};
