import { sign, verify, JwtPayload } from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { User } from "@prisma/client";
import { env } from "@util/env";
import fs from "fs";

const publicPath = "./.certs/public.pem";
const privatePath = "./.certs/private.pem";

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
    } as JwtPayload,
    privateKey,
    {
      expiresIn: "15m",
      issuer: "Remark",
      subject: user.id.toString(),
      audience: env("HOST"),
      algorithm: "RS256",
    }
  );
}

export function generateRefreshToken(user: User) {
  return sign({ user: { id: user.id }, typ: "RT" }, privateKey, {
    expiresIn: "10y",
    issuer: "Remark",
    subject: user.id.toString(),
    audience: env("HOST"),
    algorithm: "RS256",
  });
}

export async function verifyAccessToken(
  accessToken: string
): Promise<JwtPayload> {
  const verified: string | JwtPayload = verify(accessToken, publicKey, {
    issuer: "Remark",
    audience: env("HOST"),
  });

  // Payload will never be a string
  // @ts-ignore
  return verified;
}

export async function verifyRefreshToken(
  refreshToken: string
): Promise<JwtPayload> {
  const verified: string | JwtPayload = verify(refreshToken, publicKey);

  return verified as JwtPayload;
}

const client = new OAuth2Client(env("GOOGLE_CLIENT_ID"));
export async function verifyGoogleIdToken(idToken: string) {
  const ticket = await client.verifyIdToken({
    idToken: idToken,
    audience: env("GOOGLE_CLIENT_ID"),
  });
  const payload = ticket.getPayload();
  return payload;
}
