const __locator: Record<string, any> = {};

export const setServerLocator = <T>(key: string, service: T) => {
  __locator[key] = service;
};

export const getServerLocator = <T>(key: string): T => {
  return __locator[key];
};
