import App from "@browser/util/app";
import Storage from "@browser/util/storage";
import Tab from "@browser/util/tab";

interface IBlockedResponse {
  disabled?: boolean;
  blocked: boolean;
}

export default class Domain {
  static async getBlockedDomains(): Promise<string[]> {
    const list = await Storage.get("blocked");
    if (!list) return [];

    return JSON.parse(list);
  }

  static async clearBlockedDomains(): Promise<void> {
    await Storage.set("blocked", "[]");
  }

  static async getCurrentDomain() {
    let url: string;

    if (App.isInjected()) {
      url = window.location.href;
    } else {
      const tab = await Tab.getCurrent();
      if (!tab) return undefined;
      url = tab.url;
    }

    const { hostname } = new URL(url);
    return hostname;
  }

  static async isDomainBlocked(): Promise<IBlockedResponse> {
    const domain = await this.getCurrentDomain();
    if (!domain) return { disabled: true, blocked: true };

    const blocked = await this.getBlockedDomains();
    return { blocked: blocked.includes(domain) };
  }

  static async setDomainBlocked(to: boolean): Promise<void> {
    const domain = await this.getCurrentDomain();
    if (!domain) return;

    let blocked = await this.getBlockedDomains();
    if (to && !blocked.includes(domain)) blocked.push(domain);
    if (!to && blocked.includes(domain))
      blocked = blocked.filter((entry) => entry !== domain);

    await Storage.set("blocked", JSON.stringify(blocked));
    Tab.send("blocked:update");
  }
}
