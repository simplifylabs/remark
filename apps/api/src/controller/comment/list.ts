import { Request, Response } from "express";
import { Joi, prefabs, validate } from "@api/middleware/validation";
import { filter } from "@api/util/url";
import { user }, { comment } from "@api/util/prisma";

const listComments = async (req: Request, res: Response) => {
  const decoded = decodeURIComponent(String(req.query.url) || "");
  const filtered = filter(decoded);

  if (filtered.error)
    return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });

  const result = await prisma.$transaction([
    post.count({
      where: { url: { filtered: filtered.url } },
    }),
    post.count({
      where: { url: { filtered: filtered.url }, replyId: null },
    }),
    post.findMany({
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
      select: comment as any,
    }),
  ]);

  if (result.length != 3 || !result[0] || !result[1] || !result[2])
    return res.status(200).json({ total: 0, list: [] });
  return res
    .status(200)
    .json({ total: result[0], parents: result[1], list: result[2] });
};

export default [
  validate({
    query: Joi.object({
      page: prefabs.page.required(),
      url: prefabs.url.required(),
    }),
  }),
  listComments,
];
