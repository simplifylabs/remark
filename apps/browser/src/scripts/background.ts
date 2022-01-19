import App from "@browser/util/app";
import Events from "@browser/util/events";
import Tab from "@browser/util/tab";

if (App.isDev()) require("crx-hotreload");

chrome.runtime.setUninstallURL(`${App.webUrl}uninstall`);
chrome.runtime.onInstalled.addListener(Events.onInstalled);
chrome.commands.onCommand.addListener(Events.onCommand);

chrome.runtime.onUpdateAvailable.addListener(() => {
  chrome.runtime.reload();
});

chrome.runtime.onMessage.addListener((req, _, res) => {
  if (req.passed) Events.onExternalMessage(req, res);
  else Events.onInternalMessage(req, res);
  return true;
});

chrome.runtime.onMessageExternal.addListener((req, _, res) => {
  Events.onExternalMessage(req, res);
  return true;
});

chrome.webRequest.onHeadersReceived.addListener(
  Events.onHttpRequest,
  { urls: ["http://*/*", "https://*/*"] },
  ["blocking", "responseHeaders"]
);

chrome.browserAction.onClicked.addListener(() => {
  Tab.send("action:click");
});
