import * as supertest from "supertest";
import { server } from "../app";

describe("API Functionality", () => {
  let app: typeof server;
  let request;

  const username = `test-${Math.random().toString(16)}`;
  let accessToken = "";
  let fingerprint = "";

  beforeAll(() => {
    app = server;
    request = supertest(app);
  });

  it("should register successfully", async () => {
    const res = await request.post("/auth/register").send({
      username: username,
      email: username + "@gmail.com",
      password: "jest-test",
      firstname: "Jest",
      lastname: "Test",
      locale: "de_AT",
    });

    expect(res.status == 200).toBeTruthy();
  });

  it("should not login successfully (not verified)", async () => {
    const res = await request.post("/auth/login").send({
      username: username,

      password: "jest-test",
    });

    expect(res.status).toBe(403);

    expect(res.body.error).toBe("NOT_VERIFIED");
  });

  it("should verify successfully", async () => {
    const u = await user.findFirst({
      where: { username: username },
      select: { verification_token: true },
    });

    const res = await request.post("/auth/verify").send({
      verificationToken: u.verification_token,
    });

    expect(res.status).toBe(200);
  });

  it("should login successfully", async () => {
    const res = await request.post("/auth/login").send({
      username: username,
      password: "jest-test",
    });

    expect(res.status).toBe(200);
    expect(res.body.accessToken).toBeTruthy();
    accessToken = res.body.accessToken;
    fingerprint = res.headers["set-cookie"][0].split(";")[0].split("=")[1];
    expect(fingerprint).toBeTruthy();
  });

  it("should fetch profile successfully", async () => {
    const res = await request.get("/profile").set({
      Authorization: `Bearer ${accessToken}`,
      Cookie: `fingerprint=${fingerprint}`,
    });

    expect(res.status).toBe(200);
  });
});
