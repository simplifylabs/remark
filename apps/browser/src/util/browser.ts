import App from "@browser/util/app";
import Registry from "@browser/state/registry";

type Data = {
  [key: string]: any;
};

export type IEventList = {
  [event: string]: EventListener[];
};

export type EventListener = (...args: any[]) => void;
export type ITab = chrome.tabs.Tab;

export class Tab {
  static events: EventListener[] = [];

  static listen(listener: EventListener) {
    this.events.push(listener);
  }

  static call(data: Data) {
    this.events.forEach((func) => {
      func(data);
    });
  }

  static count(): Promise<number> {
    return new Promise((res) => {
      chrome.tabs.query({ windowType: "normal" }, (tabs) => {
        res(tabs.length);
      });
    });
  }

  static getCurrent(): Promise<ITab> {
    return new Promise((res) => {
      chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
        res(tabs[0]);
      });
    });
  }

  static getAll(): Promise<ITab[]> {
    return new Promise((res) => {
      chrome.tabs.query({}, (tabs) => {
        res(tabs);
      });
    });
  }

  static async find(url: string): Promise<ITab> {
    return new Promise((res) => {
      chrome.tabs.query({ url: url }, (tabs) => {
        res(tabs[0]);
      });
    });
  }

  static async close() {
    const count = await this.count();
    if (count <= 1) return { success: false };

    const tab = await this.getCurrent();
    chrome.tabs.remove(tab.id);

    return { success: true };
  }

  static async send(type: string, data: Data = {}, id?: number): Promise<void> {
    if (App.isInjected()) {
      this.call({ ...data, type: type });
      return;
    }

    const tab = await Tab.getCurrent();
    if (tab.url && tab.url.startsWith("about:")) return;
    chrome.tabs.sendMessage(id ? id : tab.id, { ...data, type: type });
  }

  static async sendAll(type: string, data: Data = {}): Promise<void> {
    if (App.isInjected()) return this.call({ ...data, type: type });

    const tabs = await Tab.getAll();
    tabs.forEach((tab) => {
      chrome.tabs.sendMessage(tab.id, { ...data, type: type });
    });
  }

  static async open(url: string): Promise<void> {
    await chrome.tabs.create({ url: url });
  }
}

export class Clipboard {
  static copy(text: string) {
    navigator.clipboard.writeText(text);
  }

  static event(body: { [key: string]: any }) {
    if (!navigator || !navigator.clipboard || !navigator.clipboard.writeText)
      return { success: false };
    this.copy(body.text);
    return { success: true };
  }
}

interface IStorageObject {
  [key: string]: string;
}

export class Storage {
  static toObject(key: string, value: string): IStorageObject {
    const obj = {};
    obj[key] = value;
    return obj;
  }

  static set(key: string, value: string): Promise<void> {
    return new Promise((res) => {
      chrome.storage.local.set(this.toObject(key, value), () => res());
    });
  }

  static get(key: string): Promise<string | undefined> {
    return new Promise((res) => {
      chrome.storage.local.get(key, (data: IStorageObject) => {
        if (!data || !data[key]) res(undefined);
        res(data[key]);
      });
    });
  }
}

export class Indicator {
  static hide() {
    if (!chrome.browserAction) return { success: false };
    chrome.browserAction.setIcon({
      path: {
        "64": chrome.runtime.getURL("assets/icon/64.png"),
        "128": chrome.runtime.getURL("assets/icon/128.png"),
        "256": chrome.runtime.getURL("assets/icon/256.png"),
      },
    });
    return { success: true };
  }

  static show() {
    if (!chrome.browserAction) return { success: false };
    chrome.browserAction.setIcon({
      path: {
        "64": chrome.runtime.getURL("assets/indicator/64.png"),
        "128": chrome.runtime.getURL("assets/indicator/128.png"),
        "256": chrome.runtime.getURL("assets/indicator/256.png"),
      },
    });
    return { success: true };
  }

  static check() {
    const state = Registry.store.getState();
    if (state.comment.total > 0) chrome.runtime.sendMessage("INDICATOR:SHOW");
    else chrome.runtime.sendMessage("INDICATOR:HIDE");
  }
}
