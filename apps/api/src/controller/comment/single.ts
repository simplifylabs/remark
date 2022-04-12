import { Request, Response } from "express";
import { Joi, prefabs, validate } from "@api/middleware/validation";
import filter from "@util/filter";
import { Post, commentSelect } from "@db";

const singleComments = async (req: Request, res: Response) => {
  const comment = await Post.findUnique({
    where: { id: String(req.params.id) },
    select: {
      ...commentSelect,
      replies: false,
      replyId: true,
      shareURL: true,
      url: true,
    },
  });

  if (!comment) return res.status(404).json({ error: "POST_NOT_FOUND" });

  if (req.query.url && typeof req.query.url == "string") {
    const decoded = decodeURIComponent(String(req.query.url) || "");
    const filtered = filter(decoded);

    if (filtered.error)
      return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });

    if (comment.url.filtered !== filtered.url)
      return res.status(400).json({ error: "INVALID_URL" });
  }

  if (comment.replyId) {
    // Using any to be able to easily overwrite the replies
    // eslint-disable-next-line
    const parent: any = await Post.findUnique({
      where: { id: comment.replyId },
      select: {
        ...commentSelect,
        replies: false,
        replyId: true,
      },
    });

    if (!parent) return res.status(404).json({ error: "POST_NOT_FOUND" });

    parent.replies = [comment];
    return res.status(200).json({ comment: parent });
  }

  delete comment.url;
  res.status(200).json({
    comment: {
      ...comment,
      replies: [],
    },
  });
};

export default [
  validate({
    params: Joi.object({
      id: prefabs.id.required(),
    }),
    query: Joi.object({
      url: prefabs.url.optional(),
    }),
  }),
  singleComments,
];
