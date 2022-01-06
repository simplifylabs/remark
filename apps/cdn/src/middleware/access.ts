import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../util/auth";

interface IUser {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}

const accessControlMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.header("authorization")?.replace("Bearer ", "");
  if (!accessToken)
    return res.status(401).json({ error: "ACCESS_TOKEN_INVALID" });
  try {
    const verified = await verifyAccessToken(accessToken);
    req.user = verified.user;
    next();
  } catch (e) {
    if (e && e.name) res.status(403).json({ error: e.name });
    else res.status(403).json({ errork: "INTERNAL_SERVER_ERROR" });
  }
};

export default accessControlMiddleware;
