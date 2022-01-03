import { Request, Response } from "express";
import { Joi, prefabs, validate } from "@middleware/validation";
import prisma from "@util/prisma";
import access from "@middleware/access";

const removeComment = async (req: Request, res: Response) => {
  const post = await prisma.post.findUnique({
    where: { id: req.params.id },
    select: { authorId: true },
  });

  if (!post) return res.status(404).json({ error: "POST_NOT_FOUND" });
  if (post.authorId !== req.user.id)
    return res.status(403).json({ error: "ACCESS_FORBIDDEN" });

  try {
    await prisma.post.delete({ where: { id: req.params.id } });
    res.status(200).json({});
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
  }
};

export default [
  access(),
  validate({
    params: Joi.object({
      id: prefabs.id.required(),
    }),
  }),
  removeComment,
];
