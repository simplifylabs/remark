import { Request, Response } from "express";
import access from "@middleware/access";
import { User } from "@db";

const meUser = async (req: Request, res: Response) => {
  const user = await User.findUnique({
    where: {
      id: req.user.id,
    },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });

  if (!user) return res.status(403).json({ error: "USER_NOT_FOUND" });
  res.status(200).json(user);
};

export default [access(), meUser];
