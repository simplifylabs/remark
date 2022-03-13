import { Tab } from "@browser/util/browser";

type IListener = () => void;

interface IOptions {
  onConnect?: IListener;
  onDisconnect?: IListener;
}

export default class Persistence {
  static connection: chrome.runtime.Port;
  static timeout: NodeJS.Timeout;

  static connectListeners: IListener[] = [];
  static disconnectListeners: IListener[] = [];

  static init(options: IOptions) {
    if (options.onConnect) Persistence.connectListeners.push(options.onConnect);
    if (options.onDisconnect)
      Persistence.disconnectListeners.push(options.onDisconnect);

    if (Persistence.connection) return;

    Persistence.connect();
    chrome.runtime.onConnect.addListener(Persistence.onChromeConnect);
  }

  static onChromeConnect(port: chrome.runtime.Port) {
    if (port.name === "keepAlive") {
      Persistence.connection = port;

      Persistence.timeout = setTimeout(Persistence.reconnect, 299995);
      port.onDisconnect.addListener(Persistence.reconnect);

      Persistence.connectListeners.forEach((func) => func());
    }
  }

  static reconnect() {
    Persistence.connection?.disconnect();
    Persistence.connection = null;

    clearTimeout(Persistence.timeout);
    Persistence.timeout = null;

    Persistence.disconnectListeners.forEach((func) => func());
    Persistence.connect();
  }

  static async connect() {
    if (Persistence.connection) return;
    const tabs = await Tab.getAll();

    for (const tab of tabs) {
      try {
        if (!Persistence.isValidURL(tab.url)) continue;

        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => chrome.runtime.connect({ name: "keepAlive" }),
        });

        chrome.tabs.onUpdated.removeListener(Persistence.retry);
        return;
      } catch (e) {
        console.warn(e);
      }
    }

    chrome.tabs.onUpdated.addListener(Persistence.retry);
  }

  static retry(_: number, change: any) {
    if (Persistence.isValidURL(change.url)) Persistence.connect();
  }

  static isValidURL(url: string | null) {
    if (!url) return false;
    return /^(file|https?):/.test(url);
  }
}
