import { Store } from "redux";

export default class Registry {
  static store: Store;

  static getStore(): Store {
    return this.store;
  }

  static set(store: Store) {
    this.store = store;
  }
}
