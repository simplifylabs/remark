import { Request, Response } from "express";
import access from "@api/middleware/access";
import prisma from "@api/util/prisma";

const meUser = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
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
