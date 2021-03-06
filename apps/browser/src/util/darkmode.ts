import { Storage } from "@browser/util/browser";
import Registry from "@browser/state/registry";
import { setDark } from "@browser/actions/render";

type IListener = (to: boolean) => void;

export default class Darkmode {
  static listener: IListener[] = [];
  static isDark = false;

  static onChange(listener: IListener) {
    this.listener.push(listener);
  }

  static offChange(listener: IListener) {
    this.listener = this.listener.filter((saved) => saved !== listener);
  }

  static update() {
    if (this.isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    this.listener.forEach((listener) => listener(this.isDark));
  }

  static async read() {
    const saved = await Storage.get("darkmode");

    if (saved === "true") this.isDark = true;
    else if (saved === "false") this.isDark = false;
    else
      this.isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    this.update();
  }

  static async toggle(to?: boolean) {
    this.isDark = to !== undefined ? to : !this.isDark;

    if (this.isDark) Storage.set("darkmode", "true");
    else Storage.set("darkmode", "false");

    this.update();
  }

  static checkSidebar() {
    if (this.isSiteDark()) Registry.dispatch(setDark(true));
    else Registry.dispatch(setDark(false));
  }

  static isSiteDark() {
    const meta: HTMLMetaElement = document.querySelector(
      `meta[name="color-scheme"]`
    );

    if (meta && meta.content == "dark") return true;
    else if (meta && meta.content == "light") return false;

    const body = this.isElementDark("body");
    if (body) return true;

    return this.isElementDark("html");
  }

  static isElementDark(query: string): boolean | null {
    const element = document.querySelector(query);
    const styles = window.getComputedStyle(element);
    const values = styles.backgroundColor
      .match(/\d+/g)
      .map((str) => Number(str));

    // Opacity is 0
    if ((values.length === 4 && values[3] === 0) || values.length < 3)
      return null;
    return values.slice(0, 3).reduce((x, n) => x + n) / 3 < 127.5;
  }
}
