import { Request, Response } from "express";
import { Joi, prefabs, validate } from "@api/middleware/validation";
import { filter } from "@api/util/url";
import { user }, { comment } from "@db";

const singleComments = async (req: Request, res: Response) => {
  // Using any to be able to easily overwrite the replies
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const post: any = await post.findUnique({
    where: { id: String(req.params.id) },
    select: {
      ...comment,
      replies: false,
      replyId: true,
      shareURL: true,
      url: true,
    },
  });

  if (!post) return res.status(404).json({ error: "POST_NOT_FOUND" });

  if (req.query.url && typeof req.query.url == "string") {
    const decoded = decodeURIComponent(String(req.query.url) || "");
    const filtered = filter(decoded);

    if (filtered.error)
      return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });

    if (post.url.filtered !== filtered.url)
      return res.status(400).json({ error: "INVALID_URL" });
  }

  if (post.replyId) {
    // Using any to be able to easily overwrite the replies
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parent: any = await post.findUnique({
      where: { id: post.replyId },
      select: {
        ...comment,
        replies: false,
        replyId: true,
      },
    });

    if (!parent) return res.status(404).json({ error: "POST_NOT_FOUND" });

    parent.replies = [post];
    return res.status(200).json({ comment: parent });
  } else {
    post.replies = [];
  }

  delete post.url;
  res.status(200).json({ comment: post });
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
