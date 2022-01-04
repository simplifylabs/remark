import { Request, Response } from "express";
import access from "@api/middleware/access";
import { user } from "@db";

const meUser = async (req: Request, res: Response) => {
  const me = await user.findUnique({
    where: {
      id: req.user.id,
    },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });

  if (!me) return res.status(403).json({ error: "USER_NOT_FOUND" });
  res.status(200).json(me);
};

export default [access(), meUser];
