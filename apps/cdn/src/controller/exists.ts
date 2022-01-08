import { Request, Response } from "express";
import limit from "@cdn/middleware/limit";
import path from "path";
import fs from "fs";

const existsController = async (req: Request, res: Response) => {
  const exists = fs.existsSync(
    path.resolve(`uploads/avatars/${req.params.size}/${req.params.file}`)
  );
  res.status(200).json({ exists });
};

export default [limit({ requests: 50, per: "IP" }), existsController];
