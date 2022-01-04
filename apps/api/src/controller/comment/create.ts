import { Request, Response } from "express";
import { Joi, prefabs, validate } from "@api/middleware/validation";
import { filter } from "@api/util/url";
import access from "@api/middleware/access";
import sanitize from "sanitize-html";
import { Url, Post, commentSelect } from "@db";

const createComment = async (req: Request, res: Response) => {
  try {
    if (req.body.replyTo) {
      const reply = await Post.findUnique({
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

    let url = await Url.findUnique({
      where: { filtered: filtered.url },
    });

    if (!url) url = await Url.create({ data: { filtered: filtered.url } });

    const comment = await Post.create({
      data: {
        authorId: req.user.id,
        originalURL: filtered.original,
        shareURL: filtered.share,
        urlId: url.id,
        replyId: req.body.replyTo || null,
        comment: text,
      },
      select: {
        ...commentSelect,
        replies: true,
        replyId: true,
        shareURL: true,
      },
    });

    const shareURL = comment.shareURL.replace("%25REMARK_ID%25", comment.id);
    await Post.update({ where: { id: comment.id }, data: { shareURL } });

    res.status(200).json(comment);
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
