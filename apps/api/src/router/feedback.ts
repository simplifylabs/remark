import feedbackController from "@api/controller/feedback/";
import limit from "@api/middleware/limit";
import { Router } from "express";

const router = Router();

router.use(
  limit({
    requests: 5,
    per: "IP",
  })
);

router.post("/", feedbackController);

export default router;
