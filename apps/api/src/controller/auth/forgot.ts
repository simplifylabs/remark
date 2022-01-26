import { Request, Response } from "express";
import { Joi, prefabs, validate } from "@api/middleware/validation";
import { randomBytes } from "crypto";
import { sendResetEmail } from "@api/util/email";
import { env } from "@util/env";
import { User } from "@db";

const forgotPassword = async (req: Request, res: Response) => {
  const user = await User.findFirst({
    where: { email: req.body.email },
  });

  if (!user) return res.status(403).json({ error: "EMAIL_NOT_FOUND" });

  const token = randomBytes(32).toString("hex");
  const expires = new Date();
  expires.setHours(expires.getHours() + 1);

  await User.update({
    where: {
      id: user.id,
    },
    data: {
      resetToken: token,
      resetExp: expires,
    },
  });

  await sendResetEmail(
    user.email,
    user.username,
    `${env("HOST")}/auth/reset?token=${token}`
  );

  res.status(200).json({});
};

export default [
  validate({
    body: Joi.object({
      email: prefabs.email.required(),
    }),
  }),
  forgotPassword,
];
