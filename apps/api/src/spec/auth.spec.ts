import { User } from "@db";
import { server } from "../app";
import supertest from "supertest";

describe("API Auth", () => {
  let app: typeof server;
  let request;

  let accessToken = "";
  let refreshToken = "";

  beforeAll(() => {
    jest.spyOn(console, "info").mockImplementation(() => null);
    app = server;
    request = supertest(app);
  });

  it("should fetch public key successfully", async () => {
    const res = await request.get("/auth/key");
    expect(res.status).toBe(200);
    expect(res.body.publicKey).toBeTruthy();
  });

  it("should register successfully", async () => {
    const res = await request.post("/auth/register").send({
      username: "jest_auth",
      email: "jest.auth@gmail.com",
      password: "Password123!",
    });

    expect(res.status).toBe(200);
    expect(res.body.accessToken).toBeTruthy();
    expect(res.body.refreshToken).toBeTruthy();
  });

  it("should not register with used username", async () => {
    const res = await request.post("/auth/register").send({
      username: "JEST_AUTH",
      email: "jest.auth.2@gmail.com",
      password: "Password123!",
    });

    expect(res.status).toBe(403);
  });

  it("should not register with used email", async () => {
    const res = await request.post("/auth/register").send({
      username: "jest_auth2",
      email: "jest.auth@gmail.com",
      password: "Password123!",
    });

    expect(res.status).toBe(403);
  });

  it("should not register with invalid username", async () => {
    const res = await request.post("/auth/register").send({
      username: "Jest-2",
      email: "jest.auth.2@gmail.com",
      password: "Password123!",
    });

    expect(res.status).toBe(400);
  });

  it("should not register with weak password", async () => {
    const res = await request.post("/auth/register").send({
      username: "Jest-2",
      email: "jest.auth.2@gmail.com",
      password: "123",
    });

    expect(res.status).toBe(400);
  });

  it("should login successfully", async () => {
    const res = await request.post("/auth/login").send({
      email: "jest.auth@gmail.com",
      password: "Password123!",
    });

    expect(res.status).toBe(200);
    expect(res.body.accessToken).toBeTruthy();
    expect(res.body.refreshToken).toBeTruthy();
  });

  it("should not login with wrong email", async () => {
    const res = await request.post("/auth/login").send({
      email: "jest.auth.2@gmail.com",
      password: "Password123!",
    });

    expect(res.status).toBe(403);
  });

  it("should not login with wrong password ", async () => {
    const res = await request.post("/auth/login").send({
      email: "jest.auth@gmail.com",
      password: "Password123",
    });

    expect(res.status).toBe(403);
  });

  it("should request password reset successfully", async () => {
    const res = await request.post("/auth/forgot").send({
      email: "jest.auth@gmail.com",
    });

    expect(res.status).toBe(200);
  });

  it("should fail on password reset with invalid email", async () => {
    const res = await request.post("/auth/forgot").send({
      email: "jest.auth.2@gmail.com",
    });

    expect(res.status).toBe(403);
  });

  it("should not reset password after expiration", async () => {
    const past = new Date();
    past.setDate(past.getDate() - 1);

    const future = new Date();
    future.setDate(future.getDate() + 1);

    await User.update({
      where: { email: "jest.auth@gmail.com" },
      data: { resetExp: past },
    });

    const user = await User.findUnique({
      where: { email: "jest.auth@gmail.com" },
      select: { resetToken: true },
    });

    const res = await request.post("/auth/reset").send({
      token: user.resetToken,
      password: "NewPassword123!",
    });

    await User.update({
      where: { email: "jest.auth@gmail.com" },
      data: { resetExp: future },
    });

    expect(res.status).toBe(403);
  });

  it("should not reset password with invalid token", async () => {
    const res = await request.post("/auth/reset").send({
      token: "-",
      password: "NewPassword123!",
    });

    expect(res.status).toBe(403);
  });

  it("should not reset password with weak password", async () => {
    const user = await User.findUnique({
      where: { email: "jest.auth@gmail.com" },
      select: { resetToken: true },
    });

    const res = await request.post("/auth/reset").send({
      token: user.resetToken,
      password: "123",
    });

    expect(res.status).toBe(400);
  });

  it("should reset password successfully", async () => {
    const user = await User.findUnique({
      where: { email: "jest.auth@gmail.com" },
      select: { resetToken: true },
    });

    const res = await request.post("/auth/reset").send({
      token: user.resetToken,
      password: "NewPassword123!",
    });

    expect(res.status).toBe(200);
  });

  it("should login with new password", async () => {
    const res = await request.post("/auth/login").send({
      email: "jest.auth@gmail.com",
      password: "NewPassword123!",
    });

    expect(res.status).toBe(200);

    refreshToken = res.body.refreshToken;
    accessToken = res.body.accessToken;

    expect(accessToken).toBeTruthy();
    expect(refreshToken).toBeTruthy();
  });

  it("should not login with old password ", async () => {
    const res = await request.post("/auth/login").send({
      email: "jest.auth@gmail.com",
      password: "Password123!",
    });

    expect(res.status).toBe(403);
  });

  it("should not refresh with invalid rt", async () => {
    const res = await request.post("/auth/refresh").send({
      refreshToken: "-",
    });

    expect(res.status).toBe(400);
  });

  it("should refresh successfully", async () => {
    const res = await request.post("/auth/refresh").send({
      refreshToken,
    });

    expect(res.status).toBe(200);
    expect(res.body.accessToken).toBeTruthy();
    expect(res.body.refreshToken).toBeTruthy();
  });

  it("should delete user successfully", async () => {
    await User.delete({ where: { email: "jest.auth@gmail.com" } });

    const user = await User.findUnique({
      where: { email: "jest.auth@gmail.com" },
      select: { id: true },
    });

    expect(user).toBeNull();
  });
});
