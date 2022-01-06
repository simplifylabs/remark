import { JwtPayload, verify } from "jsonwebtoken";
import fs from "fs";

if (!fs.existsSync("./.certs/public.pem")) {
  console.error("Public key not set. Make sure .certs/public.pem exists!");
  process.exit();
}

const publicKey = fs.readFileSync("./.certs/public.pem", "utf-8");

export function verifyAccessToken(accessToken: string): Promise<JwtPayload> {
  const verified = verify(accessToken, publicKey, {
    issuer: "Remark",
  });

  // Payload will never be a string
  // @ts-ignore
  return verified;
}
