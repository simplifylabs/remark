import { Request, Response } from "express";
import { Joi, prefabs, validate } from "@api/middleware/validation";
import { TokenPayload } from "google-auth-library";
import { downloadGoogleAvatar, convertImage } from "@util/avatar";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyGoogleIdToken,
} from "@util/auth";
import { User } from "@db";
import { User as UserType } from "@prisma/client";
import sanitize from "sanitize-html";

const google = async (req: Request, res: Response) => {
  let payload: TokenPayload | undefined | null = null;
  let user: UserType | undefined;

  try {
    payload = await verifyGoogleIdToken(req.body.token);
    if (!payload) return res.status(400).json({ error: "INVALID_ID_TOKEN" });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ error: "INVALID_ID_TOKEN" });
  }

  const username = sanitize(req.body.username);
  const email = sanitize(payload.email);

  const count = await User.count({
    where: { email },
  });

  if (count < 1) {
    if (!req.body.username)
      return res.status(400).json({ error: "USERNAME_REQUIRED" });

    const existing = await User.findFirst({
      where: {
        username,
      },
    });

    if (existing)
      return res.status(400).json({ error: "USERNAME_NOT_AVAILABLE" });

    try {
      user = await User.create({
        data: {
          username,
          email: payload.email,
          googleId: payload.sub,
        },
      });

      if (payload.picture) {
        const avatarTmpPath = await downloadGoogleAvatar(
          payload.picture,
          user.id
        );

        await convertImage(avatarTmpPath, user.id);
      }
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
  } else {
    user = await User.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: "EMAIL_NOT_FOUND" });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.status(200).json({ accessToken, refreshToken });
};

export default [
  validate({
    body: Joi.object({
      username: prefabs.username.optional(),
      token: prefabs.googleToken.required(),
    }),
  }),
  google,
];
