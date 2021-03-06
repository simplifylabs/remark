import { Request, Response } from "express";
import { validate, Joi, prefabs } from "@api/middleware/validation";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "@util/auth";
import { User } from "@db";

const refreshController = async (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken;

  try {
    const verified = await verifyRefreshToken(refreshToken);
    const user = await User.findFirst({
      where: { id: verified.user.id },
    });

    if (!user) return res.status(404).json({ error: "USER_NOT_FOUND" });

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    res
      .status(200)
      .json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (e) {
    res.status(400).json({ error: "INVALID_REFRESH_TOKEN" });
  }
};

export default [
  validate({
    body: Joi.object({
      refreshToken: prefabs.refreshToken.required(),
    }),
  }),
  refreshController,
];
