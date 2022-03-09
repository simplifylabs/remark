import { Store as ReduxStore } from "redux";

export default class Registry {
  static store: ReduxStore;

  // eslint-ignore-next-line
  static dispatch(data: any) {
    if (!this.store) return;
    Registry.store.dispatch(data);
  }

  static getStore(): ReduxStore {
    return this.store;
  }

  static set(store: ReduxStore) {
    this.store = store;
  }
}
