import { Request, Response } from "express";
import limit from "@middleware/limit";
import path from "path";
import fs from "fs";
import avatar from "@cdn/config/avatar.config";

const existsController = async (req: Request, res: Response) => {
  const exists = fs.existsSync(
    path.join(
      "apps/cdn",
      "uploads",
      "avatars",
      "50x50",
      `${req.params.file}.${avatar.filetype}`
    )
  );

  res.status(200).json({ exists });
};

export default [limit({ requests: 50, per: "IP" }), existsController];
