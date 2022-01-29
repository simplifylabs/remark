import { Request, Response } from "express";
import { Joi, prefabs, validate } from "@api/middleware/validation";
import { generateAccessToken, generateRefreshToken } from "@util/auth";
import { hash } from "@api/util/hash";
import { User } from "@db";

async function resetPassword(req: Request, res: Response) {
  const user = await User.findFirst({
    where: {
      resetToken: req.body.token,
    },
  });

  if (!user || user.googleId)
    return res.status(400).json({ error: "WRONG_TOKEN" });

  const exp = new Date(Number(user.resetExp)).getTime();
  const now = new Date().getTime();

  if (!user.resetExp || exp < now)
    return res.status(403).json({ error: "TOKEN_EXPIRED" });

  const hashed = await hash(req.body.password);
  await User.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashed,
      resetExp: null,
      resetToken: null,
    },
  });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.status(200).json({ accessToken, refreshToken });
}

export default [
  validate({
    body: Joi.object({
      token: Joi.string().required(),
      password: prefabs.password.required(),
    }),
  }),
  resetPassword,
];
