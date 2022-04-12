import { fetchComments } from "@browser/actions/comment";
import { dispatch } from "@browser/state/index";
import filter from "@util/filter";

export default class URL {
  static filtered = "";

  static update() {
    const previous = this.filtered;
    const filterResult = filter(window.location.href);

    if (filterResult.error) return;
    this.filtered = filterResult.url;

    if (this.filtered !== previous) dispatch(fetchComments(0, true));
  }
}
