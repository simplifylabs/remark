import { Request, Response } from "express";
import RedisClient from "ioredis";
import RateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";

const client = new RedisClient();

interface Options {
  requests: number;
  interval?: number;
  per?: "IP" | "USER";
}

export default function limit(input: Options | number, interval?: number) {
  let options = {
    requests: typeof input == "number" ? input : input.requests,
    interval: 60000,
    per: "USER",
  };

  if (typeof interval == "number") options.interval = interval;
  if (typeof input == "object") options = { ...options, ...input };

  return RateLimit({
    store: new RedisStore({
      // @ts-expect-error
      sendCommand: (...args: string[]) => client.call(...args),
    }),
    max: options.requests,
    windowMs: options.interval || 60000,
    keyGenerator: (req: Request) => {
      if (options.per === "IP") return req.ip;
      return req.user.id;
    },
    handler: (_: Request, res: Response) => {
      res.status(429).json({
        error: "RATE_LIMIT_EXCEEDED",
        message:
          "Max Requests exceeded for your " +
          (options.per == "IP" ? "IP" : "User"),
      });
    },
  });
}
