import API, { Error, Res } from "@browser/util/api";
import Storage from "./storage";
import Tab from "./tab";

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

  static setTokens(res: any) {
    this.accessTokenCache = res.accessToken;
    this.refreshTokenCache = res.refreshToken;

    Storage.set("access_token", this.accessTokenCache);
    Storage.set("refresh_token", this.refreshTokenCache);
  }

  static async isAuthenticated() {
    const accessToken = await this.accessToken();
    const isAuthenticated =
      accessToken !== "" && accessToken !== null && accessToken !== undefined;

    return { isAuthenticated: isAuthenticated };
  }

  static async refresh() {
    const refreshToken = await this.refreshToken();

    const res = await API.post(["auth", "refresh"], {
      refreshToken: refreshToken,
    });
    if (!res.success) return res;

    this.setTokens(res.body);
    return res;
  }

  static async me(fetchAvatar: boolean = false): Promise<Res> {
    const res = await API.get(["user", "me"]);
    if (!res.success || !fetchAvatar) return res;

    const avatar = await this.hasAvatar(res.body.id);
    return { ...res, body: { ...res.body, avatar: avatar } };
  }

  static async hasAvatar(id: string): Promise<boolean> {
    const res = await API.get([
      "CDN",
      "exists",
      "avatar",
      "50x50",
      `${id}.jpg`,
    ]);

    if (!res.success) return false;
    return res.body.exists;
  }

  static async logout(manual: boolean = false, background: boolean = false) {
    this.refreshTokenCache = "";
    this.accessTokenCache = "";
    if (background) return;

    await Storage.set("access_token", "");
    await Storage.set("refresh_token", "");

    if (manual) Tab.send("toast:success", { text: "Signed Out!" });
    Tab.sendAll("auth:update");

    if (chrome.runtime) chrome.runtime.sendMessage("LOGOUT");

    return { success: false, logout: true };
  }

  static async forgot(data: any) {
    const res = await API.post(["auth", "forgot"], {
      email: data.email,
    });

    return res;
  }

  static async reset(data: any) {
    if (data.password !== data.confirm)
      return Error.error("Passwords do not match");

    const res = await API.post(["auth", "reset"], {
      token: data.token,
      password: data.password,
    });

    if (!res.success) return res;

    Tab.send("toast:success", { text: "Authenticated!" });
    Tab.sendAll("auth:update");

    this.setTokens(res.body);
    return res;
  }

  static async update(data: any) {
    const res: Res[] = [];

    if (data.changed.includes("AVATAR")) {
      const avatar = await this.upload(data.avatar);
      res.push(avatar);
    }

    const changes: any = {};
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

  static async upload(avatar: any) {
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

    const res = await API.file(["CDN", "upload", "avatar"], form);
    return res;
  }

  static async login(data: any) {
    const res = await API.post(["auth", "login"], {
      email: data.email,
      password: data.password,
    });

    if (!res.success) return res;

    Tab.send("toast:success", { text: "Authenticated!" });
    Tab.sendAll("auth:update");

    this.setTokens(res.body);
    return res;
  }

  static async register(data: any) {
    if (data.password !== data.confirm)
      return Error.error("Passwords do not match");

    const res = await API.post(["auth", "register"], {
      username: data.username,
      email: data.email,
      password: data.password,
    });

    if (!res.success) return res;

    Tab.send("toast:success", { text: "Authenticated!" });
    Tab.send("auth:update");

    this.setTokens(res.body);
    return res;
  }
}
