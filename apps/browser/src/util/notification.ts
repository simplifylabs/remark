import { NotificationType } from "@prisma/client";
import { Tab } from "@browser/util/browser";
import Socket from "@browser/util/socket";
import User from "@browser/util/user";
import API from "@browser/util/api";

export interface INotificationRaw {
  [key: string]: any;
}

export interface INotification {
  id: string;
  url: string;
  title: string;
  message: string;
  avatar?: string;
  createdAt: string;
}

export default class Notification {
  static list: INotification[] = [];
  static total = 0;
  static page = 0;
  static unread = false;

  static async fetch(more = false) {
    if (more) this.page++;

    if (!User.isAuthenticated()) return this.logout();

    const res = await API.get(["notification", `list?page=${this.page}`]);
    if (!res.success) return this.logout();

    const list = this.parseList(res.body.list);
    if (this.page == 0) this.list = list;
    else this.list.push(...list);

    this.list = this.list.filter((item, i) => {
      return this.list.indexOf(item) == i;
    });

    this.total = res.body.total;
    this.unread = res.body.hasUnread;

    // TODO: Add "Mark Read" button
    if (this.page == 0 && this.unread)
      this.show("Unread Notifications", "You have unread notifications!");
    this.update();
  }

  static getLoaded() {
    return { total: this.total, list: this.list, unread: this.unread };
  }

  static setRead() {
    this.unread = false;
    this.update();
  }

  static update() {
    Tab.sendAll("notification:update", this.getLoaded());
  }

  static init() {
    this.fetch();

    Socket.on("notification", (data: any) => {
      data = this.parse(data);

      this.total++;
      this.unread = true;
      this.list.unshift(data);

      this.show(data);
      this.update();
    });
  }

  static logout() {
    this.page = 0;
    this.total = 0;
    this.unread = false;
    this.list = [];
    this.update();
  }

  static show(payload: any, message?: string) {
    chrome.notifications.create({
      type: "basic",
      title: `Remark: New Notification`,
      message: `You have got a new notification!`,
      iconUrl: chrome.runtime.getURL("assets/icon/64.png"),
      ...(typeof payload == "string"
        ? { title: payload, message }
        : { title: payload.title, message: payload.message }),
    });
  }

  static getNotificationInfo(payload: any): INotification {
    let notification = {};
    switch (payload.type) {
      case NotificationType.VOTES:
        notification = {
          title: `${payload.data.count} Upvotes`,
          message: `Your Remark just hit ${payload.data.count} upvotes!`,
          avatar: payload.data.voter,
        };
        break;
      case NotificationType.MENTION:
        notification = {
          title: `New Mention`,
          message: `@${payload.data.user.username} just mentioned you in a Remark!`,
          avatar: payload.data.user.id,
        };
        break;
      case NotificationType.REPLY:
        notification = {
          title: `New Reply`,
          message: `@${payload.data.user.username} just replied to your Remark!`,
          avatar: payload.data.user.id,
        };
        break;
    }

    return {
      id: payload.id,
      title: "New Notification",
      message: "You have got a new notification!",
      avatar: undefined,
      ...notification,
      url: payload.url,
      createdAt: payload.createdAt,
    };
  }

  static parse(entry: INotificationRaw): INotification {
    entry.data = JSON.parse(entry.data);
    return this.getNotificationInfo(entry);
  }

  static parseList(list: INotificationRaw[]): INotification[] {
    return list.map((n) => this.parse(n));
  }
}
