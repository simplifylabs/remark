import { Toast } from "@util/dialog";
import Tab from "@util/tab";
import User from "@util/user";

export interface Res {
  status: number;
  success: boolean;
  resent: boolean;
  offline?: boolean;
  resend: () => Promise<Res>;
  body: {
    [key: string]: any;
  };
  [key: string]: any;
}

export class Server {
  static isOnline = true;

  static devUrl = "http://localhost:5050/";
  static prodUrl = "https://api.getremark.com/";

  static devCDN = "http://localhost:5000/";
  static prodCDN = "https://cdn.getremark.com/";

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
    resent: boolean = false
  ): Promise<Res | null> {
    return new Promise(async resolve => {
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

        const parsed = await this.parse(res, resent, () =>
          this.get(path, true)
        );

        resolve(parsed);
      } catch (e) {
        const parsed = await this.parse(null, resent, () =>
          this.get(path, true)
        );
        resolve(parsed);
      }
    });
  }

  static async delete(
    path: string | string[],
    resent: boolean = false
  ): Promise<Res | null> {
    return new Promise(async resolve => {
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

        const parsed = await this.parse(res, resent, () =>
          this.delete(path, true)
        );

        resolve(parsed);
      } catch (e) {
        const parsed = await this.parse(null, resent, () =>
          this.delete(path, true)
        );
        resolve(parsed);
      }
    });
  }

  static async post(
    path: string | string[],
    data: any,
    resent: boolean = false
  ): Promise<Res | null> {
    return new Promise(async resolve => {
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

        const parsed = await this.parse(res, resent, () =>
          this.post(path, data, true)
        );

        resolve(parsed);
      } catch (e) {
        const parsed = await this.parse(null, resent, () =>
          this.post(path, data, true)
        );
        resolve(parsed);
      }
    });
  }

  static async file(
    path: string | string[],
    form: any,
    resent: boolean = false
  ): Promise<Res | null> {
    return new Promise(async resolve => {
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

        const parsed = await this.parse(res, resent, () =>
          this.file(path, form, true)
        );

        resolve(parsed);
      } catch (e) {
        const parsed = await this.parse(null, resent, () =>
          this.file(path, form, true)
        );
        resolve(parsed);
      }
    });
  }

  static async parse(
    raw: Response,
    resent: boolean,
    resend: () => Promise<Res>
  ): Promise<any> {
    if (raw === null) return await Error.parse(null);
    const res: any = {};

    res.body = await raw.json();
    res.resent = resent;
    res.resend = resend;
    res.status = raw.status;
    res.success = raw.status >= 200 && raw.status < 300;

    return await Error.parse(res as Res);
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
        if (res.resent) return User.logout();
        const refresh = await User.refresh();
        if (!refresh.success) return res;
        const resent = await this.parse(await res.resend());
        return resent;
      default:
        return this.error("Something unexpected happened");
    }
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
