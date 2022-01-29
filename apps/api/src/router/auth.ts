import googleController from "@api/controller/auth/google";
import forgotController from "@api/controller/auth/forgot";
import loginController from "@api/controller/auth/login";
import refreshController from "@api/controller/auth/refresh";
import registerController from "@api/controller/auth/register";
import resetController from "@api/controller/auth/reset";
import limit from "@middleware/limit";
import { Router } from "express";

const router = Router();

router.use(
  limit({
    requests: 300,
    per: "IP",
  })
);

router.post("/google", googleController);
router.post("/refresh", refreshController);

router.post("/login", loginController);
router.post("/register", registerController);

router.post("/forgot", forgotController);
router.post("/reset", resetController);

export default router;
