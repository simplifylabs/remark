import { user } from "@api/util/prisma";
import sanitize from "sanitize-html";
import access from "@api/middleware/access";
import { Request, Response } from "express";
import { Joi, prefabs, validate } from "@api/middleware/validation";
import { User } from "@prisma/client";
import { UpdateQuery } from "mongoose";

const updateController = async (req: Request, res: Response) => {
  const email = sanitize(req.body.email);
  const username = sanitize(req.body.username);

  const or: { [key: string]: string }[] = [];
  if (email) or.push({ email });
  if (username) or.push({ username });

  if (or.length < 1) return res.status(403).json({ error: "UPDATE_MISSING" });

  const existing = await user.findFirst({
    where: {
      OR: or,
    },
  });

  const me = await user.findUnique({
    where: {
      id: req.user.id,
    },
    select: {
      id: true,
      username: true,
    },
  });

  if (existing) {
    if (email && existing.email == email)
      return res.status(403).json({ error: "EMAIL_NOT_AVAILABLE" });
    if (!me || me.id !== existing.id || me.username == username)
      return res.status(403).json({ error: "USERNAME_NOT_AVAILABLE" });
  }

  const update: UpdateQuery<User> = {};

  if (username) update.username = username;
  if (email) update.email = email;

  await user.update({
    where: {
      id: req.user.id,
    },
    data: update,
  });

  res.status(200).json({});
};

export default [
  access(),
  validate({
    body: Joi.object({
      email: prefabs.email.optional(),
      username: prefabs.username.optional(),
    }),
  }),
  updateController,
];
