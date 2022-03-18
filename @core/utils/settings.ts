import type { ClientSettings } from '@mrx/types';

let __settings: ClientSettings = {};
export const useClientSettings = () => {
  const setSettings = (s: ClientSettings) => {
    __settings = s;
  };
  const getSetting = <K extends keyof ClientSettings>(
    key: K,
  ): ClientSettings[K] => {
    return __settings[key];
  };

  return {
    setSettings,
    getSetting,
  };
};
