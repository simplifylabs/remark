import { Request, Response } from "express";
import { hash } from "@util/hash";
import { generateAccessToken, generateRefreshToken } from "@util/auth";
import { validate, Joi, prefabs } from "@middleware/validation";
import sanitize from "sanitize-html";
import prisma from "@util/prisma";

const registerController = async (req: Request, res: Response) => {
  try {
    const email = sanitize(req.body.email);
    const username = sanitize(req.body.username);

    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existing) {
      if (existing.email == email)
        return res.status(403).json({ error: "EMAIL_NOT_AVAILABLE" });
      return res.status(403).json({ error: "USERNAME_NOT_AVAILABLE" });
    }

    const hashedPw = await hash(req.body.password);

    const user = await prisma.user.create({
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
      username: prefabs.username.required(),
      email: prefabs.email.required(),
      password: prefabs.password.required(),
    }),
  }),
  registerController,
];
