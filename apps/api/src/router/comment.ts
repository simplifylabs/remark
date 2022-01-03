import createController from "@controller/comment/create";
import listController from "@controller/comment/list";
import removeController from "@controller/comment/remove";
import singleController from "@controller/comment/single";
import urlController from "@controller/comment/url";
import voteController from "@controller/comment/vote";
import RateLimiter from "@middleware/ratelimit";
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
