import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

export const __dirname = (url: string) => dirname(fileURLToPath(url));
export const appRoot = process.cwd();
export const appSrc = resolve(appRoot, 'src');
export const appDist = resolve(appRoot, 'dist');
