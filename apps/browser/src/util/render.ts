import Registry from "@browser/state/registry";
import {
  hideFab,
  hideSidebar,
  showFab,
  showSidebar,
} from "@browser/actions/render";

export type EventListener = (...args: any[]) => void;

export type IEventList = {
  [event: string]: EventListener[];
};

export default class Render {
  static events: IEventList = {};

  // Other known FAB's
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

  static call(event: string, ...data: any[]) {
    if (!this.events[event]) return;
    this.events[event].forEach((func) => {
      func(...data);
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
    if (window.location.href.startsWith("chrome://")) return false;
    return true;
  }

  static getWrapper(): Element | undefined {
    if (!this.allowed()) return;

    const current = document.querySelector("remark-container");
    if (current) return current;

    return this.injectWrapper();
  }

  static injectWrapper(): HTMLElement | undefined {
    const launcher = document.createElement("remark-container");
    document.documentElement.appendChild(launcher);
    return launcher;
  }

  static async checkFullscreen() {
    if (document.fullscreenElement != null) return this.showFab(false);
  }

  static toggleSidebar() {
    const state = Registry.store.getState();
    if (state.render.sidebar) this.showSidebar(false);
    else this.showSidebar(true);
    this.showFab(true);
  }

  static toggleFab(action = false) {
    const state = Registry.store.getState();

    if (action) {
      if (state.render.sidebar) return this.showFab(false);
      return this.showSidebar(true);
    }

    if (state.render.fab) return this.showFab(false);
    this.showFab(true);
  }

  static autoHideFab() {
    const state = Registry.store.getState();
    if (state.render.fabAutoShown) this.showFab(false);
  }

  static showFab(shown: boolean, shownAuto = false) {
    Registry.dispatch(shown ? showFab(shownAuto) : hideFab());
  }

  static showSidebar(shown: boolean) {
    Registry.dispatch(shown ? showSidebar() : hideSidebar());
  }

  static sidebarQuerySelector(selector: string): Element | null {
    const sidebar: HTMLIFrameElement = document.querySelector(
      "remark-container #sidebar"
    );

    if (!sidebar) return null;

    const element = sidebar.contentWindow.document.querySelector(selector);
    if (!element) return null;
    return element;
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
