import forgotController from "@controller/auth/forgot";
import keyController from "@controller/auth/key";
import loginController from "@controller/auth/login";
import refreshController from "@controller/auth/refresh";
import registerController from "@controller/auth/register";
import resetController from "@controller/auth/reset";
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

router.post("/login", loginController);
router.post("/register", registerController);

router.post("/forgot", forgotController);
router.post("/reset", resetController);

router.post("/refresh", refreshController);
router.get("/key", keyController);

export default router;
