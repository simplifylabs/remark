import { Server } from "socket.io";
import { Notification, User } from "@db";
import { IEventData } from "@queue";

export default function notification(io: Server) {
  return async (data: IEventData["notification"]) => {
    if (data.type == "VOTES") {
      const existing = await Notification.count({
        where: {
          userId: data.user,
          type: data.type,
          data: {
            equals: JSON.stringify(data.data),
          },
        },
      });

      if (existing > 0) return;
    }

    const notification = await Notification.create({
      data: {
        type: data.type,
        userId: data.user,
        url: data.url,
        data: JSON.stringify(data.data),
      },
    });

    await User.update({ where: { id: data.user }, data: { hasUnread: true } });
    io.to(data.user).emit("notification", notification);
  };
}
