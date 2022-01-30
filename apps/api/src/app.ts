require("module-alias/register");
require("@util/env").load("api");
require("@util/logger")();

import express from "express";
import cookies from "cookie-parser";
import env from "@util/env";
import cors from "@api/middleware/cors";
import error from "@api/middleware/error";
import auth from "@api/router/auth";
import comment from "@api/router/comment";
import user from "@api/router/user";
import feedback from "@api/router/feedback";

const app = express();

app.set("trust proxy", true);

app.disable("etag");
app.disable("x-powered-by");

app.use(express.json());
app.use(cookies());
app.use(cors());

app.use("/auth", auth);
app.use("/comment", comment);
app.use("/user", user);
app.use("/feedback", feedback);

app.use(error());

app.use((_, res) => {
  res.status(404).json({
    error: "NOT_FOUND",
    message: "The requested ressource was not found",
  });
});

app.listen(env("PORT"), () => {
  console.info(`Remark API is listening on port ${env("PORT")}`);
});

export const server = app;
