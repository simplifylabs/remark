import { Request, Response } from "express";
import { Joi, prefabs, validate } from "@api/middleware/validation";
import { prisma, Post, Vote, commentSelect } from "@db";
import { optionalAccess } from "@api/middleware/access";
import { filter } from "@api/util/url";

const listComments = async (req: Request, res: Response) => {
  const decoded = decodeURIComponent(String(req.query.url) || "");
  const filtered = filter(decoded);

  if (filtered.error)
    return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });

  const transaction = [
    Post.count({
      where: { url: { filtered: filtered.url } },
    }),
    Post.count({
      where: { url: { filtered: filtered.url }, replyId: null },
    }),
    Post.findMany({
      where: { url: { filtered: filtered.url }, replyId: null },
      skip: Number(req.query.page) * 20,
      take: 20,
      orderBy: [
        {
          upvotes: "desc",
        },
        {
          downvotes: "asc",
        },
      ],
      // Seems like the prisma types have a little bug here
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      select: commentSelect as any,
    }),
  ];

  if (req.user && req.query.page == "0")
    transaction.push(
      Vote.findMany({
        where: {
          userId: req.user.id,
          post: { url: { filtered: filtered.url } },
        },
        select: {
          type: true,
          post: {
            select: {
              id: true,
            },
          },
        },
      })
    );

  const result = await prisma.$transaction(transaction);
  res.status(200).json({
    total: result[0] || 0,
    parents: result[1] || 0,
    list: result[2] || [],
    votes: result.length == 4 ? result[3] : [],
  });
};

export default [
  optionalAccess,
  validate({
    query: Joi.object({
      page: prefabs.page.required(),
      url: prefabs.url.required(),
    }),
  }),
  listComments,
];
