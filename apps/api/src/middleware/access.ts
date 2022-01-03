import { verifyAccessToken } from "@util/auth";
import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
      };
    }
  }
}

async function access(req: Request, res: Response, next: NextFunction) {
  const accessToken = req.header("authorization")?.replace("Bearer ", "");
  if (!accessToken)
    return res.status(403).json({ error: "ACCESS_TOKEN_INVALID" });

  try {
    const verified = await verifyAccessToken(accessToken);
    req.user = verified.user;
    next();
  } catch (e) {
    res.status(403).json({ error: "ACCESS_TOKEN_INVALID" });
  }
}

export default () => access;
