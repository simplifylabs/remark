import App from "@browser/util/app";

interface Data {
  [key: string]: any;
}

export interface Res {
  status: number;
  success: boolean;
  [key: string]: any;
}

export class Server {
  static devWeb = "http://localhost:3000/";
  static prodWeb = "https://www.remark.surf/";

  static devAPI = "http://localhost:5050/";
  static prodAPI = "https://api.remark.surf/";

  static devCDN = "http://localhost:5000/";
  static prodCDN = "https://cdn.remark.surf/";

  static devWSS = "http://localhost:5500/";
  static prodWSS = "https://wss.remark.surf/";

  static get url() {
    return App.isDev() ? this.devWeb : this.prodWeb;
  }

  static get api() {
    return App.isDev() ? this.devAPI : this.prodAPI;
  }

  static get cdn() {
    return App.isDev() ? this.devCDN : this.prodCDN;
  }

  static get wss() {
    return App.isDev() ? this.devWSS : this.prodWSS;
  }
}

class API {
  static async get(path: string | string[]): Promise<Res | null> {
    if (Array.isArray(path)) path = path.join("/");

    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");

    try {
      const res = await fetch(Server.api + path, {
        headers: headers,
        method: "GET",
        credentials: "include",
      });

      return await this.parse(res);
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  static async post(path: string | string[], data: Data): Promise<Res | null> {
    if (Array.isArray(path)) path = path.join("/");

    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");

    try {
      const res = await fetch(Server.api + path, {
        headers: headers,
        method: "POST",
        credentials: "include",
        body: typeof data === "object" ? JSON.stringify(data) : data,
      });

      return await this.parse(res);
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  static async parse(raw: Response) {
    const res: Res = await raw?.json();

    res.status = raw.status;
    res.success = raw.status >= 200 && raw.status < 300;

    return res;
  }
}

export default API;
