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

  it("should register successfully", async () => {
    const res = await request.post("/auth/register").send({
      username: "jest",
      email: "jest@gmail.com",
      password: "Password123!",
    });

    expect(res.status == 200).toBeTruthy();
  });

  it("should login successfully", async () => {
    const res = await request.post("/auth/login").send({
      email: "jest@gmail.com",
      password: "Password123!",
    });

    expect(res.status).toBe(200);
    expect(res.body.accessToken).toBeTruthy();
    expect(res.body.refreshToken).toBeTruthy();
  });

  it("should request password reset successfully", async () => {
    const res = await request.post("/auth/forgot").send({
      email: "jest@gmail.com",
    });

    expect(res.status).toBe(200);
  });

  it("should not reset password after expiration", async () => {
    const past = new Date();
    past.setDate(past.getDate() - 1);

    const future = new Date();
    future.setDate(future.getDate() + 1);

    await User.update({
      where: { username: "jest" },
      data: { resetExp: past },
    });

    const user = await User.findUnique({
      where: { username: "jest" },
      select: { resetToken: true },
    });
    expect(user).toBeTruthy();

    const res = await request.post("/auth/reset").send({
      token: user.resetToken,
      password: "NewPassword123!",
    });

    await User.update({
      where: { username: "jest" },
      data: { resetExp: future },
    });

    expect(res.status).toBe(403);
  });

  it("should reset password successfully", async () => {
    const user = await User.findUnique({
      where: { username: "jest" },
      select: { resetToken: true },
    });
    expect(user).toBeTruthy();

    const res = await request.post("/auth/reset").send({
      token: user.resetToken,
      password: "NewPassword123!",
    });

    expect(res.status).toBe(200);
  });

  it("should login with new password", async () => {
    const res = await request.post("/auth/login").send({
      email: "jest@gmail.com",
      password: "NewPassword123!",
    });

    expect(res.status).toBe(200);

    accessToken = res.body.accessToken;
    expect(accessToken).toBeTruthy();

    refreshToken = res.body.refreshToken;
    expect(refreshToken).toBeTruthy();
  });

  it("should refresh successfully", async () => {
    const res = await request.post("/auth/refresh").send({
      refreshToken,
    });

    expect(res.status).toBe(200);
  });

  it("should fetch profile successfully", async () => {
    const res = await request.get("/user/me").set({
      Authorization: `Bearer ${accessToken}`,
    });

    expect(res.status).toBe(200);
  });

  it("should delete user successfully", async () => {
    await User.delete({ where: { username: "jest" } });

    const user = await User.findUnique({
      where: { username: "jest" },
      select: { id: true },
    });

    expect(user).not.toBeTruthy();
  });
});
