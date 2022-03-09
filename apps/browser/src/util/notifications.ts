import { NotificationType } from "@prisma/client";
import Socket from "@browser/util/socket";

type NotificationData = chrome.notifications.NotificationOptions<true>;

export default class Notifications {
  static init() {
    Socket.on("notification", (data: any) => {
      this.create(data);
    });
  }

  static create(payload: any) {
    chrome.notifications.create({
      type: "basic",
      title: `Remark: New Notification`,
      message: `You have got a new notification!`,
      iconUrl: chrome.runtime.getURL("assets/icon/64.png"),
      ...this.parse(payload.type, payload.data),
    });
  }

  static parse(
    type: keyof NotificationType,
    raw: string
  ): Partial<NotificationData> {
    const data: { [key: string]: any } = JSON.parse(raw);

    switch (type) {
      case NotificationType.VOTES:
        console.log(data, typeof data, data.count);
        return {
          title: `${data.count} Upvotes`,
          message: `Your Remark just hit ${data.count} upvotes!`,
        };
      case NotificationType.MENTION:
        return {
          title: `New Mention`,
          message: `@${data.user.username} just mentioned you in a Remark!`,
        };
      case NotificationType.REPLY:
        return {
          title: `New Reply`,
          message: `@${data.user.username} just replied to your Remark!`,
        };
      default:
        return {};
    }
  }
}
