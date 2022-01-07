import { Toast } from "@browser/util/dialog";
import Tab from "@browser/util/tab";
import User from "@browser/util/user";

// eslint-disable-next-line
type Data = { [key: string]: any };

export interface Res {
  status: number;
  success: boolean;
  resent: boolean;
  offline?: boolean;
  resend: () => Promise<Res>;
  body: Data;
  // eslint-disable-next-line
  [key: string]: any;
}

export class Server {
  static isOnline = true;

  static devUrl = "http://localhost:5050/";
  static prodUrl = "https://api.remark.surf/";

  static devCDN = "http://localhost:5000/";
  static prodCDN = "https://cdn.remark.surf/";

  static notifyOnline() {
    this.isOnline = true;
    Tab.sendAll("server:online");
  }

  static notifyOffline() {
    this.isOnline = false;
    Tab.sendAll("server:offline");
  }

  static get url() {
    return process.env.NODE_ENV === "development" ? this.devUrl : this.prodUrl;
  }

  static get cdn() {
    return process.env.NODE_ENV === "development" ? this.devCDN : this.prodCDN;
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
    // eslint-disable-next-line
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

export class Error {
  static handle(res: Res) {
    if (res.error) return Toast.error(res.error);
    Toast.error("Something unexpected happened!");
  }

  static async parse(res: Res) {
    if (res === null) {
      if (Server.isOnline) Server.notifyOffline();
      return this.maintenance();
    }

    if (!Server.isOnline) Server.notifyOnline();
    if (res.success) return res;
    switch (res.body.error) {
      case "VALIDATION_ERROR":
        return this.error(res.body.message || "Validation Error");
      case "EMAIL_NOT_AVAILABLE":
        return this.error("This email is already in use");
      case "USERNAME_NOT_AVAILABLE":
        return this.error("This username is already in use");
      case "WRONG_EMAIL_OR_PASSWORD":
        return this.error("Wrong email or password");
      case "EMAIL_NOT_FOUND":
        return this.error("This email doesn't exist");
      case "WRONG_TOKEN":
        return this.error("This link is invalid");
      case "TOKEN_EXPIRED":
        return this.error("This link is already expired");
      case "RATE_LIMIT_EXCEEDED":
        return this.error("Calm Down! Rate Limit exceeded");
      case "POST_NOT_FOUND":
        return this.error("Post not found");
      case "ACCESS_FORBIDDEN":
        return this.error("Access forbidden");
      case "NO_FILE_SPECIFIED":
        return this.error("No file specified");
      case "PROCESS_IMAGE_ERROR":
        return this.error("Error processing Image");
      case "UPDATE_MISSING":
        return this.error("No Update specified");
      case "USER_NOT_FOUND":
        return User.logout();
      case "INVALID_REFRESH_TOKEN":
        return User.logout();
      case "ACCESS_TOKEN_INVALID":
        return await this.refresh(res);
      default:
        return this.error("Something unexpected happened");
    }
  }

  static async refresh(res: Res) {
    if (res.resent) return User.logout();

    const refresh = await User.refresh();
    if (!refresh.success) return res;

    const resent = await this.parse(await res.resend());
    return resent;
  }

  static success() {
    return { success: true };
  }

  static error(message: string) {
    return { success: false, error: message };
  }

  static maintenance() {
    return { success: false, redirect: "/maintenance", offline: true };
  }
}

export default API;
