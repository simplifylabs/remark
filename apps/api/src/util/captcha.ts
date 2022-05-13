import env from "@util/env";
import { verify } from "hcaptcha";

export function verifyToken(token: string) {
  return new Promise<boolean>((res) => {
    verify(env("HCAPTCHA_SECRET"), token)
      .then((data) => {
        console.log(data);
        res(data.success);
      })
      .catch((e) => {
        res(false);
      });
  });
}
