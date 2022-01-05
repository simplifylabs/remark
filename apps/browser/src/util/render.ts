import { hideFab, showFab } from "@actions/render";
import { store } from "@state/index";
import Domain from "./domain";
import { EventListener, IEventList } from "./events";

export default class Render {
  static events: IEventList = {};
  static isRendered: boolean = false;
  static isShowen: boolean = false;

  // Other known fab's
  static fabList: string[] = [
    ".intercom-lightweight-app",
    ".chaport-launcher",
    ".UR_chatElement",
    ".olark-launch-button-wrapper",
    "#intercom-container",
    "#tawk-bubble-container",
    "#helpcrunch-container",
    "#messenger-button",
    "#tidio-chat",
  ];

  static on(event: string, listener: EventListener) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(listener);
  }

  static off(event: string, listener?: EventListener) {
    if (!listener) {
      this.events[event] = [];
      return;
    }

    this.events[event] = this.events[event].filter((func) => func !== listener);
  }

  static call(event: string) {
    if (!this.events[event]) return;
    this.events[event].forEach((func) => {
      func();
    });
  }

  static find(query: string): boolean {
    const element = document.querySelector(query);
    if (element != null) return true;

    let found = null;
    document.querySelectorAll("iframe").forEach((iframe) => {
      if (!this.canAccessIFrame(iframe)) return;

      const iframeElement = iframe.contentWindow.document.querySelector(query);
      if (iframeElement != null) found = true;
    });
    return found !== null;
  }

  static canAccessIFrame(iframe: HTMLIFrameElement) {
    let html = null;

    try {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      html = doc.body.innerHTML;
    } catch (err) {
      return false;
    }

    return html !== null;
  }

  static allowed(): boolean {
    if (window.location.href.startsWith("chrome-extension://")) return false;
    if (window.location.href.startsWith("moz-extension://")) return false;
    return true;
  }

  static getWrapper(): Element | undefined {
    if (!this.allowed()) return;
    const current = document.querySelector("#remark-launcher");
    if (current) return current;
    return this.injectWrapper();
  }

  static injectWrapper(): HTMLElement | undefined {
    const wrapper = document.createElement("div");
    wrapper.id = "remark-launcher";
    document.body.appendChild(wrapper);
    return wrapper;
  }

  static async checkBlocked() {
    const { blocked, disabled } = await Domain.isDomainBlocked();

    if (!disabled && !blocked && document.fullscreenElement == null) {
      if (!this.isRendered) return Render.call("render");
      store.dispatch(showFab() as any);
    } else {
      if (!this.isRendered) return;
      store.dispatch(hideFab() as any);
    }
  }

  static fabExists(): boolean {
    let found = false;

    this.fabList.forEach((query) => {
      const result = Render.find(query);
      if (result) found = true;
    });

    return found;
  }
}
