import { Request, Response } from "express";
import { Joi, prefabs, validate } from "@api/middleware/validation";
import { Post } from "@db";
import { nanoid } from "nanoid";
import env from "@util/env";

const commentShare = async (req: Request, res: Response) => {
  const post = await Post.findUnique({
    where: { id: req.params.id },
  });
  if (!post) return res.status(404).json({ error: "POST_NOT_FOUND" });

  let slug = post.slug;
  if (!slug) slug = nanoid(5);

  res.status(200).json({ url: `${env("HOST")}/share/${slug}` });

  if (!post.slug)
    await Post.update({ where: { id: req.params.id }, data: { slug } });
};

export default [
  validate({
    params: Joi.object({
      id: prefabs.id.required(),
    }),
  }),
  commentShare,
];
