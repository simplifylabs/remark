import { Request, Response } from "express";
import { hash } from "@api/util/hash";
import { generateAccessToken, generateRefreshToken } from "@util/auth";
import { validate, Joi, prefabs } from "@api/middleware/validation";
import sanitize from "sanitize-html";
import { User } from "@db";
import { verifyToken } from "@api/util/captcha";

const registerController = async (req: Request, res: Response) => {
  try {
    const captchaSuccess = await verifyToken(req.body.token);
    if (!captchaSuccess)
      return res.status(400).json({ error: "INVALID_CAPTCHA" });

    const email = sanitize(req.body.email);
    const username = sanitize(req.body.username);

    const existing = await User.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existing) {
      if (existing.email == email)
        return res.status(400).json({ error: "EMAIL_NOT_AVAILABLE" });
      return res.status(400).json({ error: "USERNAME_NOT_AVAILABLE" });
    }

    const hashedPw = await hash(req.body.password);

    const user = await User.create({
      data: {
        username,
        email,
        password: hashedPw,
      },
    });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.status(200).json({ accessToken, refreshToken });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
  }
};

export default [
  validate({
    body: Joi.object({
      token: prefabs.captchaToken.optional(),
      username: prefabs.username.required(),
      email: prefabs.email.required(),
      password: prefabs.password.required(),
    }),
  }),
  registerController,
];
