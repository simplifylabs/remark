import listController from "@controller/user/list";
import meController from "@controller/user/me";
import updateController from "@controller/user/update";
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
router.get("/me", meController);

router.post("/update", updateController);

export default router;
