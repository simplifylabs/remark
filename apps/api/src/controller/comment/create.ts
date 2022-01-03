import { Request, Response } from "express";
import { Joi, prefabs, validate } from "@middleware/validation";
import { filter } from "@util/url";
import access from "@middleware/access";
import sanitize from "sanitize-html";
import prisma, { comment } from "@util/prisma";

const createComment = async (req: Request, res: Response) => {
  try {
    if (req.body.replyTo) {
      const reply = await prisma.post.findUnique({
        where: { id: req.body.replyTo },
        select: { id: true, replyId: true },
      });

      if (!reply || reply.replyId)
        return res.status(400).json({ error: "POST_NOT_FOUND" });
    }

    const text = sanitize(req.body.comment);

    const filtered = filter(req.body.url);
    if (filtered.error)
      return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });

    let url = await prisma.url.findUnique({
      where: { filtered: filtered.url },
    });

    if (!url)
      url = await prisma.url.create({ data: { filtered: filtered.url } });

    const post = await prisma.post.create({
      data: {
        authorId: req.user.id,
        originalURL: filtered.original,
        shareURL: filtered.share,
        urlId: url.id,
        replyId: req.body.replyTo || null,
        comment: text,
      },
      select: {
        ...comment,
        replies: true,
        replyId: true,
        shareURL: true,
      },
    });

    const shareURL = post.shareURL.replace("%25REMARK_ID%25", post.id);
    await prisma.post.update({ where: { id: post.id }, data: { shareURL } });

    res.status(200).json(post);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
  }
};

export default [
  access(),
  validate({
    body: Joi.object({
      comment: prefabs.comment.required(),
      url: prefabs.url.required(),
      replyTo: prefabs.id.optional(),
    }),
  }),
  createComment,
];
