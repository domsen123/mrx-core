import { resolve } from 'path';
export * from '@mrx/utils/logger';

export const appRoot = process.cwd();
export const appSrc = resolve(appRoot, 'src');
export const appDist = resolve(appRoot, 'dist');
