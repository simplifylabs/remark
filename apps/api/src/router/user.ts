import listController from "@api/controller/user/list";
import meController from "@api/controller/user/me";
import updateController from "@api/controller/user/update";
import limit from "@middleware/limit";
import { Router } from "express";

const router = Router();

router.use(
  limit({
    requests: 300,
    per: "IP",
  })
);

router.get("/list", listController);
router.get("/me", meController);

router.post("/update", updateController);

export default router;
