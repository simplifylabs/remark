import { Tab } from "@browser/util/browser";
import App from "@browser/util/app";
import User from "@browser/util/user";
import Error from "@browser/util/error";

type Data = { [key: string]: any };

export interface Res extends Data {
  status: number;
  success: boolean;
  resent: boolean;
  offline?: boolean;
  resend: () => Promise<Res>;
  body: Data;
}

export class Server {
  static isOnline = true;

  static devUrl = "http://localhost:5050/";
  static prodUrl = "https://api.remark.surf/";

  static devCDN = "http://localhost:5000/";
  static prodCDN = "https://cdn.remark.surf/";

  static devWSS = "http://localhost:5500";
  static prodWSS = "https://wss.remark.surf/";

  static notifyOnline() {
    this.isOnline = true;
    Tab.sendAll("server:online");
  }

  static notifyOffline() {
    this.isOnline = false;
    Tab.sendAll("server:offline");
  }

  static get url() {
    return App.isDev() ? this.devUrl : this.prodUrl;
  }

  static get cdn() {
    return App.isDev() ? this.devCDN : this.prodCDN;
  }

  static get wss() {
    return App.isDev() ? this.devWSS : this.prodWSS;
  }
}

class API {
  static async get(
    path: string | string[],
    resent = false
  ): Promise<Res | null> {
    const isCdn = Array.isArray(path) && path[0] === "CDN";
    if (isCdn) (path as string[]).shift();

    if (Array.isArray(path)) path = path.join("/");

    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");

    const accessToken = await User.accessToken();
    if (accessToken) headers.append("authorization", `Bearer ${accessToken}`);

    try {
      const res = await fetch(`${isCdn ? Server.cdn : Server.url}${path}`, {
        headers: headers,
        method: "GET",
        credentials: "include",
      });

      return await this.parse(res, resent, () => this.get(path, true));
    } catch (e) {
      return await this.parse(null, resent, () => this.get(path, true));
    }
  }

  static async delete(
    path: string | string[],
    resent = false
  ): Promise<Res | null> {
    const isCdn = Array.isArray(path) && path[0] === "CDN";
    if (isCdn) (path as string[]).shift();

    if (Array.isArray(path)) path = path.join("/");

    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");

    const accessToken = await User.accessToken();
    if (accessToken) headers.append("authorization", `Bearer ${accessToken}`);

    try {
      const res = await fetch(`${isCdn ? Server.cdn : Server.url}${path}`, {
        headers: headers,
        method: "DELETE",
        credentials: "include",
      });

      return await this.parse(res, resent, () => this.delete(path, true));
    } catch (e) {
      return await this.parse(null, resent, () => this.delete(path, true));
    }
  }

  static async post(
    path: string | string[],
    data: Data,
    resent = false
  ): Promise<Res | null> {
    const isCdn = Array.isArray(path) && path[0] === "CDN";
    if (isCdn) (path as string[]).shift();

    if (Array.isArray(path)) path = path.join("/");

    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");

    const accessToken = await User.accessToken();
    if (accessToken) headers.append("authorization", `Bearer ${accessToken}`);

    try {
      const res = await fetch(`${isCdn ? Server.cdn : Server.url}${path}`, {
        headers: headers,
        method: "POST",
        credentials: "include",
        body: typeof data === "object" ? JSON.stringify(data) : data,
      });

      return await this.parse(res, resent, () => this.post(path, data, true));
    } catch (e) {
      return await this.parse(null, resent, () => this.post(path, data, true));
    }
  }

  static async file(
    path: string | string[],
    form: any,
    resent = false
  ): Promise<Res | null> {
    const isCdn = Array.isArray(path) && path[0] === "CDN";
    if (isCdn) (path as string[]).shift();

    if (Array.isArray(path)) path = path.join("/");

    const headers = new Headers();
    headers.append("Accept", "application/json");

    const accessToken = await User.accessToken();
    if (accessToken) headers.append("authorization", `Bearer ${accessToken}`);

    try {
      const res = await fetch(`${isCdn ? Server.cdn : Server.url}${path}`, {
        headers: headers,
        method: "POST",
        credentials: "include",
        body: form,
      });

      return await this.parse(res, resent, () => this.file(path, form, true));
    } catch (e) {
      return await this.parse(null, resent, () => this.file(path, form, true));
    }
  }

  static async parse(
    raw: Response,
    resent: boolean,
    resend: () => Promise<Res>
  ): Promise<Res> {
    if (raw === null) return await Error.parse(null);

    const res: Res = {
      body: await raw.json(),
      status: raw.status,
      success: raw.status >= 200 && raw.status < 300,
      resent,
      resend,
    };

    return await Error.parse(res);
  }
}

export default API;
