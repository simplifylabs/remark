import App from "@browser/util/app";
import Tab from "@browser/util/tab";
import User from "@browser/util/user";

function Policy(policy: string) {
  // Allow empty policies
  if (!policy) {
    this.raw = "";
    this.directives = {};
    return this;
  }

  // With lowercase, nonce stops working
  // policy = policy.toLowerCase();

  this.raw = policy;
  this.directives = {};

  var directives = this.raw.split(";");
  for (var i = 0; i < directives.length; ++i) {
    var directive = directives[i].trim();
    var tokens = directive.split(/\s+/);

    var name = tokens[0];
    if (!name) {
      continue;
    }
    var values = tokens.slice(1, tokens.length);
    this.directives[name] = values.join(" ");
  }
  return this;
}

Policy.prototype.get = function (directive) {
  if (!this.directives[directive]) return "";
  return this.directives[directive];
};

Policy.prototype.add = function (directive, value) {
  if (!this.directives[directive]) {
    this.directives[directive] = value;
  } else {
    this.directives[directive] += " " + value;
  }
  return this.directives[directive];
};

Policy.prototype.set = function (directive, value) {
  if (!value) {
    delete this.directives[directive];
    return;
  }
  this.directives[directive] = value;
  return this.directives[directive];
};

Policy.prototype.remove = function (directive, value) {
  if (!this.directives[directive]) {
    return;
  } else {
    var directiveValues = this.directives[directive].split(" ");
    var index = directiveValues.indexOf(value);
    if (index > -1) {
      directiveValues.splice(index, 1);
      this.directives[directive] = directiveValues.join(" ");
    }
  }
};

Policy.prototype.toString = Policy.prototype.string = function () {
  var out = "";
  for (var directive in this.directives) {
    if (this.directives[directive]) {
      out += directive + " " + this.directives[directive] + "; ";
    }
  }
  return out.trim();
};

Policy.prototype.toPrettyString = Policy.prototype.prettyString = function () {
  var out = "";
  for (var directive in this.directives) {
    if (this.directives[directive]) {
      out += directive + "\n\t" + this.directives[directive] + ";\n";
    }
  }
  return out.substring(0, out.length - 1);
};

module.exports = Policy;

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

chrome.webRequest.onHeadersReceived.addListener(
  (details) => {
    const headers = details.responseHeaders;

    if (!headers) return {};
    for (let i = 0; i < headers.length; i++) {
      if (
        headers[i].name.toUpperCase() == "CONTENT-SECURITY-POLICY" ||
        headers[i].name.toUpperCase() == "X-WEBKIT-CSP"
      ) {
        const policy = new Policy(headers[i].value);

        // if (
        //   policy.get("script-src").includes("unsafe-inline") &&
        //   policy.get("script-src").includes("nonce-")
        // ) {
        //   policy
        //     .get("script-src")
        //     .split(" ")
        //     .forEach((entry) => {
        //       if (entry.includes("nonce-")) policy.remove("script-src", entry);
        //     });
        // }

        // if (policy.get("style-src")) {
        //   policy.add("style-src", "'self'");
        //   policy.add("style-src", "'unsafe-inline'");
        //   policy.add("style-src", "https://fonts.googleapis.com");
        // }

        // if (policy.get("font-src"))
        //   policy.add("font-src", "https://fonts.gstatic.com");

        // console.log(policy.toString());
        console.log(headers[i].value);
        headers[i].value = policy.toString();
        console.log(headers[i].value);
      }
    }

    return { responseHeaders: headers };
  },
  { urls: ["http://*/*", "https://*/*"], types: ["main_frame"] },
  ["blocking", "responseHeaders"]
);

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
