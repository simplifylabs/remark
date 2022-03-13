import io, { Socket as ISocket } from "socket.io-client";
import { Server } from "@browser/util/api";
import User from "@browser/util/user";

type Listener = (...data: any) => void;
interface IEvent {
  event: string;
  listener: Listener;
}

export default class Socket {
  static socket: ISocket;
  static events: IEvent[] = [];
  static authenticated = false;

  static async init() {
    this.socket = io(Server.wss, {
      reconnection: true,
      autoConnect: true,
      rejectUnauthorized: false,
      transports: ["websocket"],
    });

    this.socket.io.on("error", (error) => {
      console.warn(error);
    });

    this.socket.on("connect", () => {
      this.authenticate();
    });

    this.socket.on("auth_failed", () => {
      this.authenticated = false;
      User.refresh();
    });

    this.socket.on("auth_success", () => {
      this.authenticated = true;
    });

    this.events.forEach((item) => {
      this.socket.on(item.event, item.listener);
    });
  }
  static on(event: string, listener: Listener) {
    if (this.socket) this.socket.on(event, listener);
    this.events.push({ event, listener });
  }

  static off(event: string, listener?: Listener) {
    if (this.socket) this.socket.off(event, listener);

    if (listener)
      this.events = this.events.filter(
        (item) => item.event == event && item.listener == listener
      );
    else this.events = this.events.filter((item) => item.event == event);
  }

  static dispose() {
    if (!this.socket) return;
    this.socket.disconnect();
    this.socket = null;
  }

  static async authenticate() {
    if (!(await User.isAuthenticated())) return;
    if (!this.socket || !this.socket.connected || this.authenticated) return;
    const accessToken = await User.accessToken();
    this.socket.emit("auth", { accessToken });
  }

  static async logout() {
    if (!this.socket || !this.socket.connected) return;
    this.authenticated = false;
    this.dispose();
    this.init();
  }
}
