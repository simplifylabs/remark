import feedbackController from "@controller/feedback/";
import RateLimiter from "@middleware/ratelimit";
import { Router } from "express";

const router = Router();

router.use(
  RateLimiter({
    maxRequest: 5,
    key: "IP",
    windowMs: 60 * 1000,
  })
);

router.post("/", feedbackController);

export default router;
