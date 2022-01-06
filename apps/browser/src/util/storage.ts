interface IStorageObject {
  [key: string]: string;
}

export default class Storage {
  static toObject(key: string, value: string): IStorageObject {
    const obj = {};
    obj[key] = value;
    return obj;
  }

  static set(key: string, value: string): Promise<void> {
    return new Promise((res) => {
      chrome.storage.local.set(this.toObject(key, value), () => res());
    });
  }

  static get(key: string): Promise<string | undefined> {
    return new Promise((res) => {
      chrome.storage.local.get(key, (data: IStorageObject) => {
        if (!data || !data[key]) res(undefined);
        res(data[key]);
      });
    });
  }

  static setSynced(key: string, value: string): Promise<void> {
    return new Promise((res) => {
      chrome.storage.sync.set(this.toObject(key, value), () => res());
    });
  }

  static getSync(key: string): Promise<string> {
    return new Promise<string>((res) => {
      chrome.storage.sync.get(key, (data: IStorageObject) => {
        if (!data || !data[key]) res(undefined);
        res(data[key]);
      });
    });
  }
}
