import { createRequire } from 'module';
import { dirname } from 'path';
import { getLogger } from '@mrx/utils';

const require = createRequire(import.meta.url);

export const restartInitializer = async (command = 'start') => {
  const { default: nodemon } = await import('nodemon');
  nodemon({
    verbose: true,
    exec: `pnpm exec mrx ${command}`,
    cwd: process.cwd(),
    watch: [process.cwd(), dirname(require.resolve('@mrx/server'))],
    ignore: ['*.d.ts', '**/dist/*'],
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
