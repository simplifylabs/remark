import { Request, Response } from "express";
import { Joi, prefabs, validate } from "@middleware/validation";
import prisma from "@util/prisma";

const commentUrl = async (req: Request, res: Response) => {
  const comment = await prisma.post.findUnique({
    where: { id: req.params.id },
  });

  if (!comment) return res.status(404).json({ error: "POST_NOT_FOUND" });
  return res.status(200).json({ url: comment.shareURL });
};

export default [
  validate({
    params: Joi.object({
      id: prefabs.id.required(),
    }),
  }),
  commentUrl,
];
