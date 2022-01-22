import { fetchComments } from "@browser/actions/comment";
import { setIsOnline } from "@browser/actions/connection";
import { checkLoggedIn } from "@browser/actions/user";
import { Snackbar, Toast } from "@browser/util/dialog";
import { dispatch } from "@browser/state/index";
import Settings from "@browser/util/settings";
import Render from "@browser/util/render";
import Tab from "@browser/util/tab";
import User from "@browser/util/user";
import App from "@browser/util/app";
import Domain from "@browser/util/domain";
import Policy from "@browser/util/policy";
import Indicator from "@browser/util/indicator";

type Data = { [key: string]: any };

export default class Events {
  static async listenInjected() {
    window.addEventListener("load", () => {
      dispatch(checkLoggedIn());
      Render.checkFullscreen();
    });

    document.addEventListener("fullscreenchange", () => {
      Render.checkFullscreen();
    });

    chrome.runtime.onMessage.addListener(this.onMessageInjected);
    window.addEventListener("message", this.onWindowMessage, false);

    Tab.listen(this.onMessageInjected);
    dispatch(fetchComments(0));
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

  static onInstalled(details: chrome.runtime.InstalledDetails) {
    if (App.isDev()) return;
    if (details.reason != "install") return;
    chrome.tabs.create({ url: `${App.webUrl}auth/signup` });
  }

  static onHttpRequest(details: chrome.webRequest.WebResponseHeadersDetails) {
    const headers = details.responseHeaders;
    if (!headers) return {};

    headers.forEach((header) => {
      if (!Policy.isPolicyHeader(header.name)) return;
      return Policy.updatePolicy(header.value);
    });

    return { responseHeaders: headers };
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

  static async onInternalMessage(type: string, res: (data: Data) => void) {
    switch (type) {
      case "LOGOUT":
        res(await User.logout(false, true));
        break;
      case "INDICATOR:SHOW":
        res(Indicator.show());
        break;
      case "INDICATOR:HIDE":
        res(Indicator.hide());
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
      case "indicator:check":
        Indicator.check();
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
        res(await User.isAuthenticated());
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
        res(await Tab.closeAndReload());
        break;
      case "SETTINGS":
        res(await Settings.event(req));
        break;
      case "CLEAR":
        res(await Domain.clear(req));
        break;
      default:
        res({ success: false });
    }
  }
}
