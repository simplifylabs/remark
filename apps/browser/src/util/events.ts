import { fetchComments } from "@browser/actions/comment";
import { setIsOnline } from "@browser/actions/connection";
import { checkLoggedIn } from "@browser/actions/user";
import { store } from "@browser/state/index";
import { Snackbar, Toast } from "@browser/util/dialog";
import Render from "@browser/util/render";
import Tab from "@browser/util/tab";

// These types are used in other files
// eslint-disable-next-line
export type EventListener = (...args: any[]) => void;

export type IEventList = {
  [event: string]: EventListener[];
};

// eslint-disable-next-line
type Data = { [key: string]: any };

export default class Events {
  static async listen() {
    window.addEventListener("load", () => {
      // eslint-disable-next-line
      store.dispatch(checkLoggedIn() as any);
      Render.checkBlocked();
    });

    document.addEventListener("fullscreenchange", () => {
      Render.checkBlocked();
    });

    window.addEventListener(
      "message",
      (event) => {
        if (
          event.source !== window ||
          !event.data ||
          !event.data.type ||
          !event.data.type.startsWith("REMARK:")
        )
          return;

        this.pass(event);
      },
      false
    );

    Tab.listen(this.onMessage);
    chrome.runtime.onMessage.addListener(this.onMessage);

    // eslint-disable-next-line
    store.dispatch(fetchComments(0) as any);
  }

  static onMessage(data: Data) {
    if (!data || !data.type) return;
    switch (data.type) {
      case "blocked:update":
        Render.checkBlocked();
        break;
      case "auth:update":
        // eslint-disable-next-line
        store.dispatch(checkLoggedIn() as any);
        break;
      case "server:offline":
        // eslint-disable-next-line
        store.dispatch(setIsOnline(false) as any);
        break;
      case "server:online":
        // eslint-disable-next-line
        store.dispatch(setIsOnline(true) as any);
        break;
      case "snackbar:success":
        Snackbar.success(data.text);
        break;
      case "snackbar:error":
        Snackbar.error(data.text);
        break;
      case "toast:success":
        Toast.success(data.text);
        break;
      case "toast:error":
        Toast.error(data.text);
        break;
    }
  }

  // eslint-disable-next-line
  static reply(event: MessageEvent, data: Data) {
    if (!event.data || !event.data.type) return;
    window.postMessage({ ...data, type: `RE:${event.data.type}` }, "*");
  }

  static pass(event: MessageEvent) {
    const data = { ...event.data };
    data.type = data.type.replace("REMARK:", "");
    chrome.runtime.sendMessage({ ...data, passed: true }, (res) => {
      this.reply(event, res);
    });
  }
}
