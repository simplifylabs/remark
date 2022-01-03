import { getValidationMessage } from "@api/middleware/validation";
import { Request, Response } from "express";
import { ValidationError } from "express-validation";

function error(err: Error, _1: Request, res: Response) {
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
