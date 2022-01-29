require("module-alias/register");
require("@util/env").load("cdn");
require("@util/logger")();

import express from "express";
import avatar from "@cdn/router/avatar";
import env from "@util/env";

const app = express();

app.disable("etag");
app.disable("x-powered-by");

app.use(express.json());

app.use("/avatar", avatar);

app.listen(env("PORT"), () => {
  console.info(`Remark CDN is listening on port ${env("PORT")}`);
});
