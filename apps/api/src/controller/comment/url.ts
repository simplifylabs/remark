import { Request, Response } from "express";
import { Joi, validate } from "@api/middleware/validation";
import { Post } from "@db";

const commentUrl = async (req: Request, res: Response) => {
  const post = await Post.findFirst({
    where: {
      OR: [{ id: req.params.id }, { slug: req.params.id }],
    },
  });

  if (!post) return res.status(404).json({ error: "POST_NOT_FOUND" });
  return res.status(200).json({ url: post.shareURL });
};

export default [
  validate({
    params: Joi.object({
      id: Joi.string().min(5).required(),
    }),
  }),
  commentUrl,
];
