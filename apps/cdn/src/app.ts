require("module-alias/register");
require("@cdn/util/env").load();
require("@cdn/util/logger")();

import express from "express";
import avatar from "@cdn/router/avatar";
import env from "@cdn/util/env";

const app = express();

app.disable("etag");
app.disable("x-powered-by");

app.use(express.json());

app.use("/avatar", avatar);

app.listen(env("PORT"), () => {
  console.info(`Remark CDN is listening on port ${env("PORT")}`);
});
