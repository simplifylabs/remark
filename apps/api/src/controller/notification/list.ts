import { Joi, prefabs, validate } from "@api/middleware/validation";
import { Request, Response } from "express";
import { prisma, Notification } from "@db";

async function listNotifications(req: Request, res: Response) {
  const result = await prisma.$transaction([
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
    total: result[0] || 0,
    list: result[1] || [],
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
