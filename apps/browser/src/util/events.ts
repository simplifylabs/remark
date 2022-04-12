import { setIsOnline } from "@browser/actions/connection";
import { checkLoggedIn } from "@browser/actions/user";
import {
  fetchNotifications,
  updateNotifications,
} from "@browser/actions/notification";
import { Tab, Clipboard, Indicator } from "@browser/util/browser";
import { Snackbar, Toast } from "@browser/util/dialog";
import { dispatch } from "@browser/state/index";
import Notification from "@browser/util/notification";
import Settings from "@browser/util/settings";
import Domain from "@browser/util/domain";
import Render from "@browser/util/render";
import User from "@browser/util/user";
import URL from "@browser/util/url";
import App from "@browser/util/app";
type Data = { [key: string]: any };

export default class Events {
  static async listenInjected() {
    dispatch(checkLoggedIn());
    dispatch(fetchNotifications());

    document.addEventListener("fullscreenchange", () => {
      Render.checkFullscreen();
    });

    chrome.runtime.onMessage.addListener(this.onMessageInjected);
    window.addEventListener("message", this.onWindowMessage, false);

    Tab.listen(this.onMessageInjected);

    URL.update();
    Render.checkFullscreen();
  }

  static onWindowMessage(event: MessageEvent) {
    if (event.source !== window || !event?.data?.type?.startsWith("REMARK:"))
      return;

    const data = {
      ...event.data,
      type: event.data.type.replace("REMARK:", ""),
    };

    chrome.runtime.sendMessage({ ...data, passed: true }, (res) => {
      if (!res) return;
      window.postMessage({ ...res, type: `RE:${event.data.type}` }, "*");
    });
  }

  static onTabChange() {
    Tab.send("indicator:check");
  }

  static onTabUpdate(id: number, change: any) {
    if (change.url) Tab.send("url:change", {}, id);
  }

  static onInstalled(details: chrome.runtime.InstalledDetails) {
    if (details.reason != "install") return;
    chrome.tabs.create({ url: `${App.webUrl}auth/signup?auto=1` });
  }

  static async onCommand(command: string, tab: chrome.tabs.Tab) {
    switch (command) {
      case "toggle_button":
        Tab.send("fab:toggle", {}, tab ? tab.id : null);
        break;
      case "toggle_sidebar":
        Tab.send("sidebar:toggle", {}, tab ? tab.id : null);
        break;
    }
  }

  static async onInternalMessage(
    req: string | { [key: string]: any },
    res: (data: Data) => void
  ) {
    const type = typeof req == "string" ? req : req.type;
    const body = typeof req == "string" ? {} : req;

    switch (type) {
      case "LOGOUT":
        res(await User.logout(false, true));
        break;
      case "TOKEN:UPDATE":
        res(await User.setTokens(body, true));
        break;
      case "INDICATOR:SHOW":
        res(Indicator.show());
        break;
      case "INDICATOR:HIDE":
        res(Indicator.hide());
        break;
      case "NOTIFICATIONS:GET":
        res(Notification.getLoaded());
        break;
      case "NOTIFICATIONS:READ":
        Notification.setRead();
        res(null);
        break;
      case "NOTIFICATIONS:MORE":
        await Notification.fetch(true);
        res(null);
        break;
      case "COPY":
        res(Clipboard.event(body));
        break;
      default:
        res({ success: false });
    }
  }

  static onMessageInjected(data: Data) {
    if (chrome.runtime.lastError)
      return console.error(chrome.runtime.lastError);

    if (!data || !data.type) return;
    switch (data.type) {
      case "server:offline":
        dispatch(setIsOnline(false));
        break;
      case "server:online":
        dispatch(setIsOnline(true));
        break;
      case "action:click":
        Render.toggleFab(true);
        break;
      case "fab:toggle":
        Render.toggleFab();
        break;
      case "sidebar:toggle":
        Render.toggleSidebar();
        break;
      case "auth:update":
        dispatch(checkLoggedIn());
        break;
      case "notification:update":
        dispatch(updateNotifications(data));
        break;
      case "token:update":
        User.setTokens(data, true);
        break;
      case "snackbar:success":
        Snackbar.success(data.text);
        break;
      case "snackbar:error":
        Snackbar.error(data.text);
        break;
      case "toast:error":
        Toast.error(data.text);
        break;
      case "indicator:check":
        Indicator.check();
        break;
      case "url:change":
        Render.autoHideFab();
        URL.update();
        break;
    }
  }

  static async onExternalMessage(req: Data, res: (data: Data) => void) {
    if (!req.type) res({ success: false });
    switch (req.type) {
      case "PING":
        res({ success: true });
        break;
      case "AUTHENTICATED":
        res(await User.checkAuthenticated());
        break;
      case "GOOGLE":
        res(await User.google(req));
        break;
      case "REGISTER":
        res(await User.register(req));
        break;
      case "LOGIN":
        res(await User.login(req));
        break;
      case "FORGOT":
        res(await User.forgot(req));
        break;
      case "RESET":
        res(await User.reset(req));
        break;
      case "UPDATE":
        res(await User.update(req));
        break;
      case "ME":
        res(await User.me(true));
        break;
      case "CLOSE":
        res(await Tab.close());
        break;
      case "SETTINGS":
        res(await Settings.event(req));
        break;
      case "CLEAR":
        res(await Domain.clear(req));
        break;
      case "LOGOUT":
        res(await User.logout(false));
        break;
      default:
        res({ success: false });
    }
  }
}
