import App from "@browser/util/app";
import { EventListener } from "@browser/util/events";
type ITab = chrome.tabs.Tab;

type Data = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export default class Tab {
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

  static async reload(): Promise<void> {
    const tab = await this.getCurrent();
    chrome.tabs.reload(tab.id);
  }

  static async close(url: string): Promise<void> {
    const count = await this.count();
    if (count <= 1) return;

    const tab = await this.find(url);
    chrome.tabs.remove(tab.id);
  }

  static async send(type: string, data: Data = {}): Promise<void> {
    if (App.isInjected()) {
      this.call({ ...data, type: type });
      return;
    }

    const tab = await Tab.getCurrent();
    chrome.tabs.sendMessage(tab.id, { ...data, type: type });
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
