import { Request, Response } from "express";
import { user } from "@api/util/prisma";

const listUsers = async (req: Request, res: Response) => {
  if (!req.query.q) return res.status(200).json({ list: [] });

  const users = await user.findMany({
    where: {
      username: {
        contains: String(req.query.q),
      },
    },
    select: {
      id: true,
      username: true,
    },
    take: 5,
  });

  res.status(200).json({ list: users });
};

export default [listUsers];
