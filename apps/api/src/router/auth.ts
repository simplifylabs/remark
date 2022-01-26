import forgotController from "@api/controller/auth/forgot";
import keyController from "@api/controller/auth/key";
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

router.post("/login", loginController);
router.post("/register", registerController);

router.post("/forgot", forgotController);
router.post("/reset", resetController);

router.post("/refresh", refreshController);
router.get("/key", keyController);

export default router;
