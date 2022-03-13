require("module-alias/register");
require("@util/env").load("wss");
require("@util/logger")();

import env from "@util/env";
import notification from "@wss/consumers/notification";
import auth from "@wss/controller/auth";
import { consume } from "@queue";
import { createServer } from "http";
import { Server } from "socket.io";

const http = createServer();
const io = new Server(http);

io.on("connection", (socket) => {
  socket.on("auth", auth(io, socket));
});

consume("notification", notification(io));

http.listen(env("PORT"), () => {
  console.info(`Remark WSS is listening on port ${env("PORT")}`);
});
