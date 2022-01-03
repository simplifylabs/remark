import { User } from "@prisma/client";
import fs from "fs";
import path from "path";
import { sign, verify } from "jsonwebtoken";

interface IPayload {
  user: { id: string };
  typ: "Bearer" | "RT";
}

const rootPath = path.join(__dirname, "..", "..", "..");
const publicPath = path.join(rootPath, ".certs", "public.pem");
const privatePath = path.join(rootPath, ".certs", "private.pem");

if (!fs.existsSync(privatePath)) {
  console.error("Private key not set. Make sure .certs/private.pem exists!");
  process.exit();
}

if (!fs.existsSync(publicPath)) {
  console.error("Public key not set. Make sure .certs/public.pem exists!");
  process.exit();
}

const privateKey = fs.readFileSync(privatePath, "utf-8");
export const publicKey = fs.readFileSync(publicPath, "utf-8");

export function generateAccessToken(user: User) {
  return sign(
    {
      user: { id: user.id },
      typ: "Bearer",
    } as IPayload,
    privateKey,
    {
      expiresIn: "15m",
      issuer: "Remark",
      subject: user.id.toString(),
      audience: process.env.HOST,
      algorithm: "RS256",
    }
  );
}

export function generateRefreshToken(user: User) {
  return sign({ user: { id: user.id }, typ: "RT" }, privateKey, {
    expiresIn: "10y",
    issuer: "Remark",
    subject: user.id.toString(),
    audience: process.env.HOST,
    algorithm: "RS256",
  });
}

export async function verifyAccessToken(accessToken: string) {
  const verified: IPayload = verify(accessToken, publicKey, {
    issuer: "Remark",
    audience: process.env.HOST,
  });
  return verified;
}

export async function verifyRefreshToken(refreshToken: string) {
  const verified: IPayload = verify(refreshToken, publicKey);
  return verified;
}
