import App from "@browser/util/app";
import { EventListener } from "@browser/util/events";
type ITab = chrome.tabs.Tab;

export default class Tab {
  static events: EventListener[] = [];

  static listen(listener: EventListener) {
    this.events.push(listener);
  }

  static call(data: any) {
    this.events.forEach(func => {
      func(data);
    });
  }

  static count(): Promise<number> {
    return new Promise(res => {
      chrome.tabs.query({ windowType: "normal" }, tabs => {
        res(tabs.length);
      });
    });
  }

  static getCurrent(): Promise<ITab> {
    return new Promise(res => {
      chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
        res(tabs[0]);
      });
    });
  }

  static getAll(): Promise<ITab[]> {
    return new Promise(res => {
      chrome.tabs.query({}, tabs => {
        res(tabs);
      });
    });
  }

  static find(url: string): Promise<ITab> {
    return new Promise(res => {
      chrome.tabs.query({ url: url }, tabs => {
        res(tabs[0]);
      });
    });
  }

  static reload(): Promise<any> {
    return new Promise(async res => {
      const tab = await this.getCurrent();
      chrome.tabs.reload(tab.id);
      res();
    });
  }

  static close(url: string): Promise<any> {
    return new Promise(async res => {
      const count = await this.count();
      if (count <= 1) return res(null);
      const tab = await this.find(url);
      chrome.tabs.remove(tab.id);
      res();
    });
  }

  static send(type: string, data: any = {}): Promise<any> {
    return new Promise(async res => {
      if (App.isInjected()) return this.call({ ...data, type: type });

      const tab = await Tab.getCurrent();
      chrome.tabs.sendMessage(tab.id, { ...data, type: type });
      res();
    });
  }

  static sendAll(type: string, data: any = {}): Promise<any> {
    return new Promise(async res => {
      if (App.isInjected()) return this.call({ ...data, type: type });

      const tabs = await Tab.getAll();
      tabs.forEach(tab => {
        chrome.tabs.sendMessage(tab.id, { ...data, type: type });
      });
      res();
    });
  }

  static open(url: string): Promise<any> {
    return new Promise(async res => {
      chrome.tabs.create({ url: url });
      res();
    });
  }
}
