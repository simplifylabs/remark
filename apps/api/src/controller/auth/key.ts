import { Request, Response } from "express";
import { publicKey } from "@api/util/auth";

const keyController = async (req: Request, res: Response) => {
  res.status(200).json({ publicKey });
};

export default [keyController];
