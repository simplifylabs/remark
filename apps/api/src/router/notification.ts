import listController from "@api/controller/notification/list";
import readController from "@api/controller/notification/read";
import access from "@middleware/access";
import limit from "@middleware/limit";
import { Router } from "express";

const router = Router();

router.use(access());
router.use(
  limit({
    requests: 100,
    per: "USER",
  })
);

router.get("/list", listController);
router.post("/read", readController);

export default router;
