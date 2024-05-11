import { getValidationMessage } from "@api/middleware/validation";
import { NextFunction, Request, Response } from "express";
import { ValidationError } from "express-validation";

// eslint-disable-next-line
function error(err: Error, _: Request, res: Response, _2: NextFunction) {
  if (err instanceof ValidationError) {
    const message = getValidationMessage(err);

    if (message)
      return res.status(400).json({
        error: "VALIDATION_ERROR",
        message: message,
      });

    return res.status(400).json({ error: "VALIDATION_ERROR" });
  }

  console.error(err);
  res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
}

export default () => error;
