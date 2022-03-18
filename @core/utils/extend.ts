interface ExtendClientOptions {
  app: Promise<any>;
  routes?: any[];
}
export const extendClient = async (options: ExtendClientOptions) => {
  const { app, routes = [] } = options;
};
