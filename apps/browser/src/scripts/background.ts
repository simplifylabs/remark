import App from "@browser/util/app";
import Tab from "@browser/util/tab";
import User from "@browser/util/user";

// eslint-disable-next-line
type Data = { [key: string]: any };

if (App.isDev()) require("crx-hotreload");

chrome.runtime.setUninstallURL(`${App.webUrl}uninstall`);

chrome.runtime.onInstalled.addListener((details) => {
  if (App.isDev()) return;

  if (details.reason == "install")
    chrome.tabs.create({ url: `${App.webUrl}auth/signup` });
});

chrome.runtime.onUpdateAvailable.addListener(() => {
  chrome.runtime.reload();
});

chrome.runtime.onMessage.addListener((req, _, res) => {
  if (req.passed) handleExternalRequest(req, res);
  else handleInternalRequest(req, res);
  return true;
});

chrome.runtime.onMessageExternal.addListener((req, _, res) => {
  handleExternalRequest(req, res);
  return true;
});

async function handleExternalRequest(req: Data, res: (data: Data) => void) {
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
      res(await closeTab(req));
      break;
    default:
      res({ success: false });
  }
}

async function closeTab(req: Data) {
  const result = await Tab.close(req.url);
  setTimeout(() => Tab.reload(), 1000);
  return { success: result !== null };
}

async function handleInternalRequest(type: string, res: (data: Data) => void) {
  switch (type) {
    case "LOGOUT":
      res(await User.logout(false, true));
      break;
    default:
      res({ success: false });
  }
}
