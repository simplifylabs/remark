import App from "@browser/util/app";
import Settings, { Mode } from "@browser/util/settings";
import { Tab, Storage } from "@browser/util/browser";

type Data = { [key: string]: any };
type List = "WHITE" | "BLACK" | "SMART";

export default class Domain {
  static modeCache: Mode | null = null;

  static async getList(list: List): Promise<string[]> {
    const raw = await Storage.get(list.toLowerCase() + "list");
    if (!raw) return [];
    return JSON.parse(raw);
  }

  static async setList(list: List, to: string[]): Promise<void> {
    await Storage.set(list.toLowerCase() + "list", JSON.stringify(to));
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

      if (
        !tab ||
        tab.url.startsWith("chrome://") ||
        tab.url.startsWith("about:")
      )
        return undefined;

      url = tab.url;
    }

    const { hostname } = new URL(url);
    return hostname;
  }

  static async getMode(domain?: string): Promise<Mode | null> {
    if (this.modeCache) return this.modeCache;
    const defaultMode: Mode = await Settings.get("mode");

    if (!domain) domain = await this.getCurrentDomain();
    if (!domain) return null;

    if (await this.isDomainWhitelisted(domain)) this.modeCache = "SHOW";
    else if (await this.isDomainBlacklisted(domain)) this.modeCache = "HIDE";
    else if (await this.isDomainSmartlisted(domain)) this.modeCache = "SMART";
    else this.modeCache = defaultMode;

    return this.modeCache;
  }

  static async isDomainWhitelisted(domain: string): Promise<boolean> {
    const whitelist = await this.getList("WHITE");
    return whitelist.includes(domain);
  }

  static async isDomainBlacklisted(domain: string): Promise<boolean> {
    const blacklist = await this.getList("BLACK");
    return blacklist.includes(domain);
  }

  static async isDomainSmartlisted(domain: string): Promise<boolean> {
    const smartlist = await this.getList("SMART");
    return smartlist.includes(domain);
  }

  static async setDomain(to: Mode): Promise<void> {
    const domain = await this.getCurrentDomain();
    if (!domain) return;

    const mode = await this.getMode(domain);
    if (mode == to) return;

    this.modeCache = to;
    await this.removeFromList(this.listFromMode(mode), domain);
    await this.addToList(this.listFromMode(to), domain);
  }

  static async removeFromList(type: List, domain: string) {
    let list = await this.getList(type);
    list = list.filter((d) => d !== domain);
    await this.setList(type, list);
  }

  static async addToList(type: List, domain: string) {
    const list = await this.getList(type);
    if (list.includes(domain)) return;
    list.push(domain);
    await this.setList(type, list);
  }

  static listFromMode(mode: Mode): List {
    if (mode == "SHOW") return "WHITE";
    if (mode == "HIDE") return "BLACK";
    return "SMART";
  }

  static async clear(req: Data) {
    switch (req.list) {
      case "WHITE":
        await this.setList("WHITE", []);
        return { success: true };
      case "BLACK":
        await this.setList("BLACK", []);
        return { success: true };
      case "SMART":
        await this.setList("SMART", []);
        return { success: true };
      default:
        return { success: false };
    }
  }
}
