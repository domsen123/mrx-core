import { getLogger } from '@mrx/utils';

export const restartInitializer = async (command = 'start') => {
  const { default: nodemon } = await import('nodemon');
  nodemon({
    verbose: true,
    exec: `pnpm exec mrx ${command}`,
    cwd: process.cwd(),
    watch: [process.cwd()],
    ignore: ['*.d.ts', '**/dist/*', '**/*.vue', '**/@mrx/client/src/*'],
    ignoreRoot: ['.git', 'node_modules/!(@mrx/server)/*'],
    ext: 'ts',
  });
  nodemon
    .on('restart', (files) => {
      getLogger().info('🔄 Files Changed: Restarting Server! %o', files);
    })
    .on('quit', () => {
      process.exit(0);
    });
};
