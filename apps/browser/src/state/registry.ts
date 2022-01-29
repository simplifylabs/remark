import { Store } from "redux";

export default class Registry {
  static store: Store;

  // eslint-ignore-next-line
  static dispatch(data: any) {
    if (!this.store) return;
    Registry.store.dispatch(data);
  }

  static getStore(): Store {
    return this.store;
  }

  static set(store: Store) {
    this.store = store;
  }
}
