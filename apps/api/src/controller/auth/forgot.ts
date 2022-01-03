import { Request, Response } from "express";
import { Joi, prefabs, validate } from "@middleware/validation";
import { randomBytes } from "crypto";
import { sendResetEmail } from "@util/email";
import prisma from "@util/prisma";

const forgotPassword = async (req: Request, res: Response) => {
  const user = await prisma.user.findFirst({
    where: { email: req.body.email },
  });

  if (!user) return res.status(403).json({ error: "EMAIL_NOT_FOUND" });

  const token = randomBytes(32).toString("hex");
  const expires = new Date();
  expires.setHours(expires.getHours() + 1);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      resetToken: token,
      resetExp: expires,
    },
  });

  res.status(200).json({});

  sendResetEmail(
    user.email,
    user.username,
    `${process.env.HOST}/auth/reset?token=${token}`
  );
};

export default [
  validate({
    body: Joi.object({
      email: prefabs.email.required(),
    }),
  }),
  forgotPassword,
];
