import { Request, Response } from "express";
import { Joi, prefabs, validate } from "@api/middleware/validation";
import access from "@middleware/access";
import { Vote, Post } from "@db";
import { sendToQueue } from "@queue";

const voteComment = async (req: Request, res: Response) => {
  try {
    let vote = await Vote.findFirst({
      where: { userId: req.user.id, postId: req.params.id },
      select: { id: true, type: true },
    });

    let type: "CREATED" | "DELETED" | "TOGGLED" = "CREATED";
    if (vote && vote.type == req.body.type) type = "DELETED";
    else if (vote) type = "TOGGLED";

    let data = {};
    if (type == "CREATED" || !vote) {
      vote = await Vote.create({
        data: {
          userId: req.user.id,
          postId: req.params.id,
          type: req.body.type,
        },
      });

      if (req.body.type === "UP") data = { upvotes: { increment: 1 } };
      else data = { downvotes: { increment: 1 } };
    } else if (type == "DELETED") {
      await Vote.delete({
        where: { id: vote.id },
      });

      if (req.body.type === "UP") data = { upvotes: { decrement: 1 } };
      else data = { downvotes: { decrement: 1 } };
    } else {
      await Vote.update({
        where: { id: vote.id },
        data: {
          type: req.body.type,
        },
      });

      if (req.body.type === "UP")
        data = { upvotes: { increment: 1 }, downvotes: { decrement: 1 } };
      else data = { upvotes: { decrement: 1 }, downvotes: { increment: 1 } };
    }

    await Post.update({
      where: {
        id: req.params.id,
      },
      data,
    });

    res.status(200).json({ action: type });

    const post = await Post.findUnique({
      where: { id: req.params.id },
      select: {
        upvotes: true,
        downvotes: true,
        shareURL: true,
        author: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!post) return;

    const votes = post.upvotes - post.downvotes;
    if ([3, 5, 10, 50, 100, 500, 1000].includes(votes)) {
      sendToQueue("notification", {
        type: "VOTES",
        user: post.author.id,
        url: post.shareURL,
        data: { count: votes, voter: req.user.id },
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
  }
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
