import type { ClientSettings } from '@mrx/types';

let __settings: ClientSettings = {};
export const useClientSettings = () => {
  const setSettings = (s: ClientSettings) => {
    __settings = s;
  };

  const setSetting = (key: keyof ClientSettings, value: any): void => {
    __settings[key] = value;
  };

  const getSetting = (key: keyof ClientSettings) => {
    return __settings[key];
  };

  return {
    setSettings,
    setSetting,
    getSetting,
  };
};
