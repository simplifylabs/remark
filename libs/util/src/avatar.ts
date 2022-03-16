import { join } from "path";
import { createWriteStream } from "fs";
import request from "request";
import sharp from "sharp";

export const avatar = {
  sizes: [50, 100, 200],
  quality: {
    50: 80,
    100: 85,
    200: 90,
  },
  filetype: "jpg",
};

export async function convertImage(path: string, userId: string) {
  for (let i = 0; i < avatar.sizes.length; i++) {
    const size = avatar.sizes[i];

    await sharp(path)
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
          `${userId}.${avatar.filetype}`
        )
      );
  }
}

export async function downloadGoogleAvatar(url: string, userId: string) {
  return new Promise<string>((res, rej) => {
    const tmpPath = join("apps/cdn/uploads/temp", userId + ".jpg");
    request(url)
      .pipe(createWriteStream(tmpPath))
      .on("error", rej)
      .on("close", () => {
        res(tmpPath);
      });
  });
}
