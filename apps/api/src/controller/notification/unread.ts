import { Request, Response } from "express";
import { Notification } from "@db";

export default async function unreadNotifications(req: Request, res: Response) {
  const count = Notification.count({
    where: {
      userId: req.user.id,
      read: false,
    },
  });

  res.status(200).json({ count });
}
