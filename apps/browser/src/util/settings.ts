import Storage from "@browser/util/storage";

// eslint-disable-next-line
type Data = { [key: string]: any };
export type Mode = "SHOW" | "SMART" | "HIDE";

interface ISettings {
  mode: Mode;
}

const defaultSettings: ISettings = {
  mode: "SMART",
};

export default class Settings {
  static cache: ISettings | null = null;

  static async load() {
    if (this.cache) return this.cache;

    let raw = await Storage.get("settings");
    let parsed = raw ? JSON.parse(raw) : {};
    let updated = false;

    if (typeof parsed !== "object") parsed = {};
    Object.keys(defaultSettings).forEach((key) => {
      if (parsed[key] != undefined) return;
      parsed[key] = defaultSettings[key];
      updated = true;
    });

    if (updated) await this.save(parsed);
    this.cache = parsed;
    return this.cache;
  }

  static async save(settings: ISettings) {
    this.cache = settings;
    await Storage.set("settings", JSON.stringify(settings));
  }

  static async get(key: keyof ISettings) {
    return (await this.load())[key];
  }

  static async set(key: keyof ISettings, value: ISettings[typeof key]) {
    const settings = await this.load();
    settings[key] = value;
    await this.save(settings);
  }

  static async event(data: Data) {
    if (data.load == true) {
      const settings = await this.load();
      return { success: true, settings };
    }

    if (data.update) {
      const settings = await this.load();

      Object.keys(data.update).forEach((key) => {
        settings[key] = data.update[key];
      });

      await this.save(settings);
    }

    return { success: true };
  }
}
