import { createStore, useStore } from '@mrx/utils';
import type { Context } from '@mrx/types';

export const install = ({ app, isClient, initialState }: Context) => {
  const pinia = createStore();
  app.use(pinia);

  const store = useStore();

  if (isClient) {
    store.replaceStore(initialState.pinia || {});
  } else {
    initialState.pinia = store.getStore;
  }
};
