import { Router } from "express";
import commentController from "@cdn/controller/og/comment";

const router = Router();

router.get("/comment", commentController);

export default router;
