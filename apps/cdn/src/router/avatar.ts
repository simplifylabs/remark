import path from "path";
import express, { Router, Request, Response } from "express";
import avatar from "@cdn/config/avatar.config";
import uploadController from "@cdn/controller/upload";
import existsController from "@cdn/controller/exists";

const router = Router();

// Images are provided by nginx in production
if (process.env.NODE_ENV == "development") {
  avatar.sizes.forEach((size) => {
    router.use(
      `/${size}x${size}`,
      express.static(`apps/cdn/uploads/avatars/${size}x${size}/`, {
        extensions: [avatar.filetype],
      })
    );

    router.get(`/${size}x${size}/*`, (req: Request, res: Response) => {
      res.sendFile(
        path.resolve(
          `apps/cdn/assets/default-${
            req.query.dark ? "dark" : "light"
          }-${size}x${size}.${avatar.filetype}`
        )
      );
    });
  });
}

router.get(`/exists/:size/:file`, existsController);
router.post("/upload", uploadController);

export default router;
