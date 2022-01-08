import { hideFab, showFab } from "@browser/actions/render";
import { EventListener, IEventList } from "./events";
import { store } from "@browser/state/index";
import Domain from "./domain";

export default class Render {
  static events: IEventList = {};
  static isRendered = false;
  static isShowen = false;

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
    if (current) return (current as HTMLIFrameElement).querySelector("#app");

    return this.injectWrapper();
  }

  static injectWrapper(): HTMLElement | undefined {
    const wrapper = document.createElement("iframe");
    wrapper.id = "remark-launcher";
    wrapper.setAttribute(
      "style",
      "position: fixed !important; opacity: 1 !important; width: 100vw !important; height: 100vh !important; top: 0 !important; left: 0 !important; border: none !important; display: block !important; z-index: 2147483646 !important; background-color: transparent !important; color-scheme: light !important; pointer-events: auto !important;"
    );

    wrapper.src = "about: blank";
    wrapper.frameBorder = "0";
    // @ts-ignore
    wrapper.allowTransparency = "true";

    const app = document.createElement("div");
    app.id = "app";

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = chrome.extension.getURL("css/injected.css");

    document.body.appendChild(wrapper);
    wrapper.contentWindow.document.body.appendChild(app);
    wrapper.contentWindow.document.head.appendChild(link);
    wrapper.contentWindow.document.body.style.backgroundColor = "transparent";

    return app;
  }

  static async checkBlocked() {
    const { blocked, disabled } = await Domain.isDomainBlocked();

    if (!disabled && !blocked && document.fullscreenElement == null) {
      if (!this.isRendered) return Render.call("render");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      store.dispatch(showFab() as any);
    } else {
      if (!this.isRendered) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
