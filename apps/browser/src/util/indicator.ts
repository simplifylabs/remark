import Registry from "@browser/state/registry";

export default class Indicator {
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
