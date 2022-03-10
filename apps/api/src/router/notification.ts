import listController from "@api/controller/notification/list";
import unreadController from "@api/controller/notification/unread";
import updateController from "@api/controller/notification/update";
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
router.get("/unread/count", unreadController);
router.post("/:id/update", updateController);

export default router;
