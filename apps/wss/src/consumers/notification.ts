import { Server } from "socket.io";
import { Notification } from "@db";
import { IEventData } from "@queue";

export default function notification(io: Server) {
  return async (data: IEventData["notification"]) => {
    await Notification.create({
      data,
    });

    io.to(data.user.id).emit("NOTIFICATION", notification);
  };
}
