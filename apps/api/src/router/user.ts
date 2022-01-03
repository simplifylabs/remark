import listController from "@api/controller/user/list";
import meController from "@api/controller/user/me";
import updateController from "@api/controller/user/update";
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
router.get("/me", meController);

router.post("/update", updateController);

export default router;
