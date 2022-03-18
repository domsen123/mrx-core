import fs from 'fs';
import { resolve } from 'path';
import type { ServerSettings } from '@mrx/types';
export * from '@mrx/utils/logger';

export const appRoot = process.cwd();
export const appSrc = resolve(appRoot, 'src');
export const appDist = resolve(appRoot, 'dist');

interface Imp<T = void> {
  default: T;
  [key: string]: any;
}
export const importIfExists = async <T = void>(
  path: string,
): Promise<Imp<T> | undefined> => {
  if (fs.existsSync(path)) {
    return await import(path);
  }
};

let __settings: ServerSettings = {};
export const useServerSettings = () => {
  const setSettings = (s: ServerSettings) => {
    __settings = s;
  };

  const setSetting = (key: keyof ServerSettings, value: any): void => {
    __settings[key] = value;
  };

  const getSetting = (key: keyof ServerSettings, defaultValue?: any) => {
    return __settings[key] ?? defaultValue;
  };

  return {
    setSettings,
    setSetting,
    getSetting,
  };
};
