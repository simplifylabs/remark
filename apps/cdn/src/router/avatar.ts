import path from "path";
import express, { Router, Request, Response } from "express";
import { avatar } from "@util/avatar";
import uploadController from "@cdn/controller/upload";
import existsController from "@cdn/controller/exists";

const router = Router();

router.get(`/exists/:file`, existsController);
router.post("/upload", uploadController);

// Images are provided by nginx in production
if (process.env.NODE_ENV == "development") {
  avatar.sizes.forEach((size) => {
    router.use(
      `/:theme/${size}x${size}`,
      express.static(`apps/cdn/uploads/avatars/${size}x${size}/`, {
        extensions: [avatar.filetype],
      })
    );

    router.get(`/:theme/${size}x${size}/*`, (req: Request, res: Response) => {
      res.sendFile(
        path.resolve(
          `apps/cdn/assets/default-${
            req.params.theme == "dark" ? "dark" : "light"
          }-${size}x${size}.${avatar.filetype}`
        )
      );
    });
  });
}

export default router;
