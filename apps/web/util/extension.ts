import Browser, { BrowserType } from "@web/util/browser";

export default class Extension {
  static firefoxUrl = `https://addons.mozilla.org/en-US/firefox/addon/${process.env.NEXT_PUBLIC_FIREFOX_STORE_ID}/`;
  static operaUrl = `https://addons.opera.com/en/extensions/details/${process.env.NEXT_PUBLIC_OPERA_STORE_ID}`;
  static edgeUrl = `https://microsoftedge.microsoft.com/addons/detail/${process.env.NEXT_PUBLIC_EDGE_ID}`;
  static chromeUrl = `https://chrome.google.com/webstore/detail/${process.env.NEXT_PUBLIC_CHROME_ID}`;

  static supported: BrowserType[] = [
    BrowserType.Firefox,
    BrowserType.Opera,
    BrowserType.Edge,
    BrowserType.Vivaldi,
    BrowserType.Chrome,
  ];

  static get isSupported(): boolean {
    if (!Browser.isMobile) return this.supported.includes(Browser.type);
    // Only allow firefox on mobile
    return Browser.type == BrowserType.Firefox;
  }

  static get url() {
    if (!this.isSupported) return;

    const browser = Browser.type;
    switch (browser) {
      case BrowserType.Firefox:
        return this.firefoxUrl;
      case BrowserType.Opera:
        return this.operaUrl;
      case BrowserType.Edge:
        return this.edgeUrl;
      default:
        return this.chromeUrl;
    }
  }

  static get id(): string | undefined {
    if (!this.isSupported) return undefined;

    const browser = Browser.type;
    switch (browser) {
      case BrowserType.Firefox:
        return process.env.NEXT_PUBLIC_FIREFOX_ID;
      case BrowserType.Opera:
        return process.env.NEXT_PUBLIC_OPERA_ID;
      case BrowserType.Edge:
        return process.env.NEXT_PUBLIC_EDGE_ID;
      default:
        return process.env.NEXT_PUBLIC_CHROME_ID;
    }
  }
}
