import { User } from "@db";
import { generateAccessToken, generateRefreshToken } from "@util/auth";
import { comparePasswords } from "@api/util/hash";
import { Request, Response } from "express";
import { Joi, prefabs, validate } from "@api/middleware/validation";

const loginController = async (req: Request, res: Response) => {
  const user = await User.findFirst({
    where: {
      email: req.body.email,
    },
  });

  if (!user) return res.status(400).json({ error: "WRONG_EMAIL_OR_PASSWORD" });
  if (user.googleId) return res.status(400).json({ error: "OAUTH_USED" });

  const passwordsMatch = await comparePasswords(
    user.password,
    req.body.password
  );

  if (!passwordsMatch)
    return res.status(400).json({ error: "WRONG_EMAIL_OR_PASSWORD" });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return res.status(200).json({ accessToken, refreshToken });
};

export default [
  validate({
    body: Joi.object({
      email: prefabs.email.required(),
      password: prefabs.password.required(),
    }),
  }),
  loginController,
];
