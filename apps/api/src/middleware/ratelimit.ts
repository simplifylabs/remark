import { Request, Response } from "express";
import RateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";

interface Options {
  maxRequest: number;
  windowMs: number;
  key: "IP" | "USER";
  message?: string;
}

export default function RateLimiter(options: Options) {
  return RateLimit({
    store: new RedisStore({}),
    max: options.maxRequest,
    windowMs: options.windowMs,
    keyGenerator: (req: Request) => {
      if (options.key === "IP") {
        return req.ip;
      } else {
        return req.user.id;
      }
    },
    handler: (_: Request, res: Response) => {
      res.status(429).json({
        error: "RATE_LIMIT_EXCEEDED",
        message:
          options.message || "Max Requests exceeded for your " + options.key,
      });
    },
  });
}
