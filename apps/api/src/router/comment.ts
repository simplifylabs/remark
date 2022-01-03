import createController from "@api/controller/comment/create";
import listController from "@api/controller/comment/list";
import removeController from "@api/controller/comment/remove";
import singleController from "@api/controller/comment/single";
import urlController from "@api/controller/comment/url";
import voteController from "@api/controller/comment/vote";
import RateLimiter from "@api/middleware/ratelimit";
import { Router } from "express";

const router = Router();

router.use(
  RateLimiter({
    maxRequest: 300,
    key: "IP",
    windowMs: 60 * 1000,
  })
);

router.get("/list", listController);
router.post("/", createController);

router.get("/:id/url", urlController);
router.get("/:id/", singleController);
router.post("/:id/vote", voteController);

router.delete("/:id", removeController);

export default router;
