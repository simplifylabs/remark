import App from "@browser/util/app";
import Events from "@browser/util/events";
import Tab from "@browser/util/tab";

if (App.isDev()) require("crx-hotreload");

(() => {
  if (!chrome) return;

  if (chrome.tabs) {
    chrome.tabs.onActivated.addListener(Events.onTabChange);
    chrome.tabs.onUpdated.addListener(Events.onTabUpdate);
  }

  if (chrome.commands) {
    chrome.commands.onCommand.addListener(Events.onCommand);
  }

  if (chrome.browserAction) {
    chrome.browserAction.onClicked.addListener(() => {
      Tab.send("action:click");
    });
  }

  if (chrome.webRequest) {
    chrome.webRequest.onHeadersReceived.addListener(
      Events.onHttpRequest,
      { urls: ["http://*/*", "https://*/*"] },
      ["blocking", "responseHeaders"]
    );
  }

  if (chrome.runtime) {
    chrome.runtime.setUninstallURL(`${App.webUrl}uninstall`);
    chrome.runtime.onInstalled.addListener(Events.onInstalled);

    chrome.runtime.onMessage.addListener((req, _, res) => {
      if (req.passed) Events.onExternalMessage(req, res);
      else Events.onInternalMessage(req, res);
      return true;
    });

    chrome.runtime.onMessageExternal.addListener((req, _, res) => {
      Events.onExternalMessage(req, res);
      return true;
    });

    chrome.runtime.onUpdateAvailable.addListener(() => {
      chrome.runtime.reload();
    });
  }
})();
