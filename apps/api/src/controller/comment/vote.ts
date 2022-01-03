import { Request, Response } from "express";
import { Joi, prefabs, validate } from "@api/middleware/validation";
import access from "@api/middleware/access";
import prisma from "@api/util/prisma";

const voteComment = async (req: Request, res: Response) => {
  let vote = await prisma.vote.findFirst({
    where: { userId: req.user.id, postId: req.params.id },
    select: { id: true, type: true },
  });

  let type: "CREATED" | "DELETED" | "TOGGLED" = "CREATED";
  if (vote && vote.type == req.body.type) type = "DELETED";
  else if (vote) type = "TOGGLED";

  let data = {};
  if (type == "CREATED" || !vote) {
    vote = await prisma.vote.create({
      data: {
        userId: req.user.id,
        postId: req.params.id,
        type: req.body.type,
      },
    });

    if (req.body.type === "UP") data = { upvotes: { increment: 1 } };
    else data = { downvotes: { increment: 1 } };
  } else if (type == "DELETED") {
    await prisma.vote.delete({
      where: { id: vote.id },
    });

    if (req.body.type === "UP") data = { upvotes: { decrement: 1 } };
    else data = { downvotes: { decrement: 1 } };
  } else {
    await prisma.vote.update({
      where: { id: vote.id },
      data: {
        type: req.body.type,
      },
    });

    if (req.body.type === "UP")
      data = { upvotes: { increment: 1 }, downvotes: { decrement: 1 } };
    else data = { upvotes: { decrement: 1 }, downvotes: { increment: 1 } };
  }

  await prisma.post.update({
    where: {
      id: req.params.id,
    },
    data,
  });

  res.status(200).json({ action: type });
};

export default [
  access(),
  validate({
    params: Joi.object({
      id: prefabs.id.required(),
    }),
    body: Joi.object({
      type: Joi.string().valid("UP", "DOWN").required(),
    }),
  }),
  voteComment,
];
