export interface Res {
  status: number;
  success: boolean;
  [key: string]: any;
}

export class Server {
  static devUrl = "http://localhost:5050/";
  static prodUrl = "https://api.getremark.com/";

  static devCDN = "http://localhost:5000/";
  static prodCDN = "https://cdn.getremark.com/";

  static get url() {
    return process.env.NODE_ENV == "development" ? this.devUrl : this.prodUrl;
  }

  static get cdn() {
    return process.env.NODE_ENV == "development" ? this.devCDN : this.prodCDN;
  }
}

class API {
  static async get(path: string | string[]): Promise<Res | null> {
    return new Promise(async (resolve) => {
      if (Array.isArray(path)) path = path.join("/");

      const headers = new Headers();
      headers.append("Accept", "application/json");
      headers.append("Content-Type", "application/json");

      try {
        const res = await fetch(Server.url + path, {
          headers: headers,
          method: "GET",
          credentials: "include",
        });

        const parsed = await this.parse(res);

        resolve(parsed);
      } catch (e) {
        console.error(e);
        resolve(null);
      }
    });
  }

  static async post(path: string | string[], data: any): Promise<Res | null> {
    return new Promise(async (resolve) => {
      if (Array.isArray(path)) path = path.join("/");

      const headers = new Headers();
      headers.append("Accept", "application/json");
      headers.append("Content-Type", "application/json");

      try {
        const res = await fetch(Server.url + path, {
          headers: headers,
          method: "POST",
          credentials: "include",
          body: typeof data === "object" ? JSON.stringify(data) : data,
        });

        const parsed = await this.parse(res);

        resolve(parsed);
      } catch (e) {
        console.error(e);
        resolve(null);
      }
    });
  }

  static async parse(raw: Response) {
    const res: Res = await raw?.json();

    res.status = raw.status;
    res.success = raw.status >= 200 && raw.status < 300;

    return res;
  }
}

export default API;
