import API, { Res } from "@browser/util/api";
import Error from "@browser/util/error";
import Storage from "@browser/util/storage";
import Tab from "@browser/util/tab";

type Data = {
  [key: string]: any;
};

export default class User {
  static accessTokenCache = "";
  static refreshTokenCache = "";

  static async accessToken() {
    if (this.accessTokenCache) return this.accessTokenCache;

    this.accessTokenCache = await Storage.get("access_token");
    return this.accessTokenCache;
  }

  static async refreshToken() {
    if (this.refreshTokenCache) return this.refreshTokenCache;

    this.refreshTokenCache = await Storage.get("refresh_token");
    return this.refreshTokenCache;
  }

  static async setTokens(res: Data) {
    this.accessTokenCache = res.accessToken;
    this.refreshTokenCache = res.refreshToken;

    await Storage.set("access_token", this.accessTokenCache);
    await Storage.set("refresh_token", this.refreshTokenCache);
  }

  static async isAuthenticated() {
    const accessToken = await this.accessToken();
    const isAuthenticated =
      accessToken !== "" && accessToken !== null && accessToken !== undefined;

    return { success: true, isAuthenticated: isAuthenticated };
  }

  static async refresh() {
    const refreshToken = await this.refreshToken();

    const res = await API.post(["auth", "refresh"], {
      refreshToken: refreshToken,
    });
    if (!res.success) return res;

    await this.setTokens(res.body);
    return res;
  }

  static async me(fetchAvatar = false): Promise<Res> {
    const res = await API.get(["user", "me"]);
    if (!res.success || !fetchAvatar) return res;

    const avatar = await this.hasAvatar(res.body.id);
    return { ...res, body: { ...res.body, avatar: avatar } };
  }

  static async hasAvatar(id: string): Promise<boolean> {
    const res = await API.get(["CDN", "avatar", "exists", id]);

    if (!res.success) return false;
    return res.body.exists;
  }

  static async logout(http = true, background = false) {
    this.refreshTokenCache = "";
    this.accessTokenCache = "";
    if (background) return;

    await Storage.set("access_token", "");
    await Storage.set("refresh_token", "");

    Tab.sendAll("auth:update");
    if (chrome.runtime) chrome.runtime.sendMessage("LOGOUT");

    if (http) return { success: false, logout: true };
    return { success: true };
  }

  static async forgot(data: Data) {
    const res = await API.post(["auth", "forgot"], {
      email: data.email,
    });

    return res;
  }

  static async reset(data: Data) {
    if (data.password !== data.confirm)
      return Error.error("Passwords do not match");

    const res = await API.post(["auth", "reset"], {
      token: data.token,
      password: data.password,
    });

    if (!res.success) return res;

    await this.setTokens(res.body);
    Tab.sendAll("auth:update");

    return res;
  }

  static async update(data: Data) {
    const res: Res[] = [];

    if (data.changed.includes("AVATAR")) {
      const avatar = await this.upload(data.avatar);
      res.push(avatar);
    }

    const changes: Data = {};
    if (data.changed.includes("USERNAME")) changes.username = data.username;
    if (data.changed.includes("EMAIL")) changes.email = data.email;

    if (Object.keys(changes).length > 0) {
      const update = await API.post(["user", "update"], changes);
      res.push(update);
    }

    const error = res.find((r) => !r.success);
    if (error) return error;
    return res[0];
  }

  static async upload(avatar: string) {
    const arr = avatar.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    const file = new File([u8arr], "image.jpg", { type: mime });

    const form = new FormData();
    form.append("image", file);

    const res = await API.file(["CDN", "avatar", "upload"], form);
    return res;
  }

  static async google(data: Data) {
    const res = await API.post(["auth", "google"], {
      token: data.token,
      ...(data.username ? { username: data.username } : {}),
    });

    if (!res.success) return res;

    await this.setTokens(res.body);
    Tab.sendAll("auth:update");

    return res;
  }

  static async login(data: Data) {
    const res = await API.post(["auth", "login"], {
      email: data.email,
      password: data.password,
    });

    if (!res.success) return res;

    await this.setTokens(res.body);
    Tab.sendAll("auth:update");

    return res;
  }

  static async register(data: Data) {
    if (data.password !== data.confirm)
      return Error.error("Passwords do not match");

    const res = await API.post(["auth", "register"], {
      username: data.username,
      email: data.email,
      password: data.password,
    });

    if (!res.success) return res;

    await this.setTokens(res.body);
    Tab.send("auth:update");

    return res;
  }
}
