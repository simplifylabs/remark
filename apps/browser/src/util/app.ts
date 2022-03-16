enum DeviceType {
  FirefoxExtension,
  OperaExtension,
  EdgeExtension,
  VivaldiExtension,
  ChromeExtension,
  SafariExtension,
}

export default class App {
  static deviceCache: DeviceType = null;

  static firefoxUrl = `https://addons.mozilla.org/en-US/firefox/addon/remark-surf/`;
  static operaUrl = `https://addons.opera.com/en/extensions/details/remark/`;
  static edgeUrl = `https://microsoftedge.microsoft.com/addons/detail/remark/llnpmengfmlgkiccppiobhjdgmieibdd`;
  static chromeUrl = `https://chrome.google.com/webstore/detail/remark/bkcfoljpnhifgljnaiahaihkppbkpcjo`;

  static isDev() {
    return process.env.NODE_ENV === "development";
  }

  static get webUrl(): string {
    if (this.isDev()) return "http://localhost:3000/";
    return "https://www.remark.surf/";
  }

  static get webHost(): string {
    if (this.isDev()) return "*://localhost:/*";
    return "*://*.remark.surf/*";
  }

  static isInjected() {
    return chrome.tabs === undefined && document.body !== undefined;
  }

  static isManifestV3() {
    return chrome.runtime.getManifest().version == "3";
  }

  static getDevice(): DeviceType {
    if (this.deviceCache) return this.deviceCache;

    if (
      navigator.userAgent.indexOf(" Firefox/") !== -1 ||
      navigator.userAgent.indexOf(" Gecko/") !== -1
    ) {
      this.deviceCache = DeviceType.FirefoxExtension;
    } else if (
      !!(window as any).opr ||
      !!(window as any).opera ||
      navigator.userAgent.indexOf(" OPR/") >= 0
    ) {
      this.deviceCache = DeviceType.OperaExtension;
    } else if (navigator.userAgent.indexOf(" Edg/") !== -1) {
      this.deviceCache = DeviceType.EdgeExtension;
    } else if (navigator.userAgent.indexOf(" Vivaldi/") !== -1) {
      this.deviceCache = DeviceType.VivaldiExtension;
    } else if (
      (window as any).chrome &&
      navigator.userAgent.indexOf(" Chrome/") !== -1
    ) {
      this.deviceCache = DeviceType.ChromeExtension;
    } else if (navigator.userAgent.indexOf(" Safari/") !== -1) {
      this.deviceCache = DeviceType.SafariExtension;
    }

    return this.deviceCache;
  }

  static isFirefox(): boolean {
    return this.getDevice() === DeviceType.FirefoxExtension;
  }

  static isChrome(): boolean {
    return this.getDevice() === DeviceType.ChromeExtension;
  }

  static isEdge(): boolean {
    return this.getDevice() === DeviceType.EdgeExtension;
  }

  static isOpera(): boolean {
    return this.getDevice() === DeviceType.OperaExtension;
  }

  static isVivaldi(): boolean {
    return this.getDevice() === DeviceType.VivaldiExtension;
  }

  static isSafari(): boolean {
    return this.getDevice() === DeviceType.SafariExtension;
  }

  static rateUrl() {
    if (this.isFirefox()) return this.firefoxUrl;
    if (this.isOpera()) return this.operaUrl;
    if (this.isEdge()) return this.edgeUrl;
    return this.chromeUrl;
  }
}
