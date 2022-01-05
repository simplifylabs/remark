import { User } from "@db";
import { server } from "../app";
import supertest from "supertest";

describe("API User", () => {
  let app: typeof server;
  let request;

  let accessToken = "";

  beforeAll(() => {
    jest.spyOn(console, "info").mockImplementation(() => null);
    app = server;
    request = supertest(app);
  });

  it("should register successfully", async () => {
    const res = await request.post("/auth/register").send({
      username: "jest.user",
      email: "jest.user@gmail.com",
      password: "Password123!",
    });

    expect(res.status).toBe(200);
    expect(res.body.accessToken).toBeTruthy();
    expect(res.body.refreshToken).toBeTruthy();

    accessToken = res.body.accessToken;
  });

  it("should fetch user successfully", async () => {
    const res = await request.get("/user/me").set({
      Authorization: `Bearer ${accessToken}`,
    });

    expect(res.status).toBe(200);
  });

  it("should update username successfully", async () => {
    const res = await request
      .post("/user/update")
      .send({ username: "jest.user2" })
      .set({
        Authorization: `Bearer ${accessToken}`,
      });

    expect(res.status).toBe(200);

    const user = User.findUnique({ where: { username: "jest.user2" } });
    expect(user).not.toBeNull();

    await User.update({
      where: { username: "jest.user2" },
      data: { username: "jest.user" },
    });
  });

  it("should update email successfully", async () => {
    const res = await request
      .post("/user/update")
      .send({ email: "jest.user2@gmail.com" })
      .set({
        Authorization: `Bearer ${accessToken}`,
      });

    expect(res.status).toBe(200);

    const user = User.findUnique({ where: { email: "jest.user2@gmail.com" } });
    expect(user).not.toBeNull();

    await User.update({
      where: { email: "jest.user2@gmail.com" },
      data: { email: "jest.user@gmail.com" },
    });
  });

  it("should fetch user list successfully", async () => {
    const res = await request.get("/user/list?q=jest").set({
      Authorization: `Bearer ${accessToken}`,
    });

    expect(res.status).toBe(200);
    expect(res.body.list).toBeTruthy();
    expect(res.body.list.length).toBeGreaterThan(0);
  });

  it("should delete user successfully", async () => {
    await User.delete({ where: { email: "jest.user@gmail.com" } });

    const user = await User.findUnique({
      where: { username: "jest.user@gmail.com" },
      select: { id: true },
    });

    expect(user).toBeNull();
  });
});
