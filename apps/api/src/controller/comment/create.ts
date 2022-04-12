import { Request, Response } from "express";
import { Joi, prefabs, validate } from "@api/middleware/validation";
import filter from "@util/filter";
import access from "@middleware/access";
import limit from "@middleware/limit";
import sanitize from "sanitize-html";
import { mentionRegex } from "@util/mentions";
import { URL, Post, commentSelect } from "@db";
import { sendToQueue } from "@queue";

const createComment = async (req: Request, res: Response) => {
  try {
    let reply = null;

    if (req.body.replyTo) {
      reply = await Post.findUnique({
        where: { id: req.body.replyTo },
        select: { id: true, replyId: true, author: { select: { id: true } } },
      });

      if (!reply || reply.replyId)
        return res.status(400).json({ error: "POST_NOT_FOUND" });
    }

    const text = sanitize(req.body.comment);
    const filteredUrl = filter(req.body.url);

    if (filteredUrl.error)
      return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });

    let url = await URL.findUnique({
      where: { filtered: filteredUrl.url },
    });

    if (!url) url = await URL.create({ data: { filtered: filteredUrl.url } });

    const comment = await Post.create({
      data: {
        authorId: req.user.id,
        originalURL: filteredUrl.original,
        shareURL: filteredUrl.share,
        urlId: url.id,
        replyId: req.body.replyTo || null,
        comment: text,
      },
      select: {
        ...commentSelect,
        replies: true,
        replyId: true,
        shareURL: true,
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    const shareURL = comment.shareURL.replace("%25REMARK_ID%25", comment.id);
    await Post.update({ where: { id: comment.id }, data: { shareURL } });

    res.status(200).json(comment);

    const mentions = [...text.matchAll(mentionRegex)];
    if (mentions.length) {
      mentions.forEach((mention) => {
        const mentionedId = mention[0].match(/\((.*?)\)/)[1];
        if (mentionedId == comment.author.id) return;

        sendToQueue("notification", {
          type: "MENTION",
          user: mentionedId,
          url: shareURL,
          data: { user: comment.author },
        });
      });
    }

    if (reply && reply.author.id !== comment.author.id) {
      sendToQueue("notification", {
        type: "REPLY",
        user: reply.author.id,
        url: shareURL,
        data: { user: comment.author },
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
  }
};

export default [
  access(),
  limit(10),
  validate({
    body: Joi.object({
      comment: prefabs.comment.required(),
      url: prefabs.url.required(),
      replyTo: prefabs.id.optional(),
    }),
  }),
  createComment,
];
