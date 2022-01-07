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

  static isPopup() {
    return chrome.tabs !== undefined && document.body !== undefined;
  }

  static getDevice(): DeviceType {
    if (this.deviceCache) return this.deviceCache;

    if (
      navigator.userAgent.indexOf(" Firefox/") !== -1 ||
      navigator.userAgent.indexOf(" Gecko/") !== -1
    ) {
      this.deviceCache = DeviceType.FirefoxExtension;
    } else if (
      // eslint-disable-next-line
      !!(window as any).opr ||
      // eslint-disable-next-line
      !!(window as any).opera ||
      navigator.userAgent.indexOf(" OPR/") >= 0
    ) {
      this.deviceCache = DeviceType.OperaExtension;
    } else if (navigator.userAgent.indexOf(" Edg/") !== -1) {
      this.deviceCache = DeviceType.EdgeExtension;
    } else if (navigator.userAgent.indexOf(" Vivaldi/") !== -1) {
      this.deviceCache = DeviceType.VivaldiExtension;
    } else if (
      // eslint-disable-next-line
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
}
