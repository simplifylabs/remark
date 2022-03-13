import { Request, Response } from "express";
import { User } from "@db";

const updateNotification = async (req: Request, res: Response) => {
  await User.update({ where: { id: req.user.id }, data: { hasUnread: false } });
  res.status(200).json({});
};

export default [updateNotification];
