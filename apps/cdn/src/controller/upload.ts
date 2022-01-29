import { Request, Response } from "express";
import { extname, join } from "path";
import access from "@middleware/access";
import limit from "@middleware/limit";
import avatar from "@cdn/config/avatar.config";
import multer from "multer";
import sharp from "sharp";
import fs from "fs";

[
  "uploads",
  "uploads/temp",
  "uploads/avatars",
  ...avatar.sizes.map((s) => `uploads/avatars/${s}x${s}`),
].forEach((path) => {
  if (fs.existsSync(join("apps/cdn", path))) return;
  fs.mkdirSync(join("apps/cdn", path));
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, join("apps/cdn", "uploads", "temp"));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    const ext = extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return callback(
        new Error("Only .png, .jpeg and .jpg images are allowed!")
      );
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1000 * 1000 * 5,
  },
});

const uploadAvatarController = async (req: Request, res: Response) => {
  // @ts-ignore
  const file = req.file;
  if (!file) return res.status(400).json({ error: "NO_FILE_SPECIFIED" });
  try {
    for (let i = 0; i < avatar.sizes.length; i++) {
      const size = avatar.sizes[i];

      await sharp(file.path)
        .resize(size, size, {
          fit: sharp.fit.cover,
          position: sharp.strategy.entropy,
        })
        .jpeg({ quality: avatar.quality[size] })
        .toFile(
          join(
            "apps/cdn",
            "uploads",
            "avatars",
            `${size}x${size}`,
            `${req.user.id}.${avatar.filetype}`
          )
        );
    }
    fs.unlinkSync(file.path);
  } catch (e) {
    fs.unlinkSync(file.path);
    return res.status(500).json({ error: "PROCESS_IMAGE_ERROR" });
  }

  res.status(200).json({});
};

export default [
  access,
  limit(10),
  upload.single("image"),
  uploadAvatarController,
];
