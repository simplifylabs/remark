import { Store as ReduxStore } from "redux";
import { fetchComments } from "@browser/actions/comment";
import { dispatch } from "@browser/state/index";
import filter from "@util/filter";

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

export class URL {
  static filtered = "";

  static update() {
    const previous = this.filtered;

    const filterResult = filter(window.location.href);
    if (filterResult.error) return;
    this.filtered = filterResult.url;

    if (this.filtered !== previous) dispatch(fetchComments(0));
  }
}
