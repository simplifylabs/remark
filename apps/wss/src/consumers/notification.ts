import { Server } from "socket.io";
import { Notification } from "@db";
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
        data: JSON.stringify(data.data),
      },
    });

    io.to(data.user).emit("notification", notification);
  };
}
