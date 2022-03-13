import { Server, Socket } from "socket.io";
import { verifyAccessToken } from "@util/auth";

export default function auth(io: Server, socket: Socket) {
  return async (data: any) => {
    try {
      const verified = await verifyAccessToken(data.accessToken);
      socket.join(verified.user.id);
      socket.emit("auth_success");
    } catch (e) {
      socket.emit("auth_failed");
    }
  };
}
