require("module-alias/register");
require("@cdn/util/env").load();
require("@cdn/util/logger")();

import express from "express";
import env from "@cdn/util/env";
import avatar from "@cdn/config/avatar.config";
import path from "path";
import uploadController from "@cdn/controller/upload";
import existsController from "@cdn/controller/exists";

const app = express();

app.disable("etag");
app.disable("x-powered-by");

app.use(express.json());

if (process.env.NODE_ENV == "development") {
  avatar.sizes.forEach((size) => {
    app.use(
      `/avatar/${size}x${size}`,
      express.static(`uploads/avatars/${size}x${size}/`, {
        extensions: [avatar.filetype],
      })
    );

    app.get(
      `/avatar/${size}x${size}/*`,
      (req: express.Request, res: express.Response) => {
        res.sendFile(
          path.resolve(
            `apps/cdn/assets/default-${size}x${size}.${avatar.filetype}`
          )
        );
      }
    );
  });
}

// TODO: Better paths
app.get(`/exists/avatar/:size/:file`, existsController);
app.post("/upload/avatar", uploadController);

app.listen(env("PORT"), () => {
  console.info(`Remark CDN is listening on port ${env("PORT")}`);
});
