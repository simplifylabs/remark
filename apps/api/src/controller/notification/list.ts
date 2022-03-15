import { Joi, prefabs, validate } from "@api/middleware/validation";
import { Request, Response } from "express";
import { prisma, Notification, User } from "@db";

async function listNotifications(req: Request, res: Response) {
  const result = await prisma.$transaction([
    User.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        hasUnread: true,
      },
    }),
    Notification.count({
      where: { userId: req.user.id },
    }),
    Notification.findMany({
      where: { userId: req.user.id },
      skip: Number(req.query.page) * 20,
      take: 20,
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  res.status(200).json({
    hasUnread: result[0]?.hasUnread || false,
    total: result[1] || 0,
    list: result[2] || [],
  });
}

export default [
  validate({
    query: Joi.object({
      page: prefabs.page.required(),
    }),
  }),
  listNotifications,
];
