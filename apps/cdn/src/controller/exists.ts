import { Request, Response } from "express";
import path from "path";
import fs from "fs";

const avatarExistsController = async (req: Request, res: Response) => {
  const exists = fs.existsSync(
    path.resolve(`uploads/avatars/${req.params.size}/${req.params.file}`)
  );
  res.status(200).json({ exists });
};

export default avatarExistsController;
