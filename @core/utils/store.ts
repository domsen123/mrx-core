import type { Pinia } from 'pinia';
import { createPinia, defineStore } from 'pinia';

export const createStore = (): Pinia => {
  const pinia = createPinia();
  return pinia;
};

export const useStore = defineStore('main', {
  state: () =>
    ({
      store: {},
    } as { store: Record<string, any> }),
  getters: {
    getItem:
      (state) =>
      <T>(key: string): T =>
        state.store[key],
    getStore: (state) => state.store,
  },
  actions: {
    setItem<T>(key: string, value: T) {
      this.store[key] = value;
    },
    replaceStore(store: Record<string, any>) {
      this.store = store;
    },
    removeItem(key: string) {
      Reflect.deleteProperty(this.store, key);
    },
  },
});
