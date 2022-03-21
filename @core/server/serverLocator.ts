const __locator: Record<string, any> = {};

export const setLocator = <T>(key: string, service: T) => {
  __locator[key] = service;
};

export const getLocator = <T>(key: string): T => {
  return __locator[key];
};
