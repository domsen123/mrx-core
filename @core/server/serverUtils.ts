import fs from 'fs';
import crypto from 'crypto';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import type { ServerSettings } from '@mrx/types';
export * from '@mrx/utils/logger';
export * from '@mrx/utils/utils';
export * from '@mrx/utils/dayjs';

export const __dirname = (url: string) => dirname(fileURLToPath(url));
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

export const hashPassword = async (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString('hex');
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(`${salt}:${derivedKey.toString('hex')}`);
    });
  });
};

export const verifyPassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const [salt, key] = hash.split(':');
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(key === derivedKey.toString('hex'));
    });
  });
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
