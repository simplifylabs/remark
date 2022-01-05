import { User, Post } from "@db";
import { server } from "../app";
import supertest from "supertest";

describe("API Comment", () => {
  let app: typeof server;
  let request;

  let accessToken = "";
  let commentId = "";

  beforeAll(() => {
    jest.spyOn(console, "info").mockImplementation(() => null);
    app = server;
    request = supertest(app);
  });

  it("should register successfully", async () => {
    const res = await request.post("/auth/register").send({
      username: "jest.comment",
      email: "jest.comment@gmail.com",
      password: "Password123!",
    });

    expect(res.status).toBe(200);
    expect(res.body.accessToken).toBeTruthy();
    expect(res.body.refreshToken).toBeTruthy();

    accessToken = res.body.accessToken;
  });

  it("should create comment successfully", async () => {
    const res = await request
      .post("/comment")
      .send({ comment: "Jest was here!", url: "https://example.com/" })
      .set({
        Authorization: `Bearer ${accessToken}`,
      });

    expect(res.status).toBe(200);
    commentId = res.body.id;
  });

  it("should fetch single comment successfully", async () => {
    const res = await request.get(`/comment/${commentId}`).set({
      Authorization: `Bearer ${accessToken}`,
    });

    expect(res.status).toBe(200);
  });

  it("should fetch comment url successfully", async () => {
    const res = await request.get(`/comment/${commentId}/url`).set({
      Authorization: `Bearer ${accessToken}`,
    });

    expect(res.status).toBe(200);
    expect(res.body.url).toBeTruthy();
  });

  it("should vote up successfully", async () => {
    const res = await request
      .post(`/comment/${commentId}/vote`)
      .send({ type: "UP" })
      .set({
        Authorization: `Bearer ${accessToken}`,
      });

    expect(res.status).toBe(200);

    const post = await Post.findUnique({
      where: { id: commentId },
      select: { upvotes: true, downvotes: true },
    });

    expect(post.upvotes).toBe(1);
    expect(post.downvotes).toBe(0);
  });

  it("should toggle vote successfully", async () => {
    const res = await request
      .post(`/comment/${commentId}/vote`)
      .send({ type: "DOWN" })
      .set({
        Authorization: `Bearer ${accessToken}`,
      });

    expect(res.status).toBe(200);

    const post = await Post.findUnique({
      where: { id: commentId },
      select: { upvotes: true, downvotes: true },
    });

    expect(post.upvotes).toBe(0);
    expect(post.downvotes).toBe(1);
  });

  it("should remove vote successfully", async () => {
    const res = await request
      .post(`/comment/${commentId}/vote`)
      .send({ type: "DOWN" })
      .set({
        Authorization: `Bearer ${accessToken}`,
      });

    expect(res.status).toBe(200);

    const post = await Post.findUnique({
      where: { id: commentId },
      select: { upvotes: true, downvotes: true },
    });

    expect(post.upvotes).toBe(0);
    expect(post.downvotes).toBe(0);
  });

  it("should fetch comment list successfully", async () => {
    const res = await request
      .get("/comment/list?page=0&url=https://example.com/")
      .set({
        Authorization: `Bearer ${accessToken}`,
      });

    expect(res.status).toBe(200);
    expect(res.body.list).toBeTruthy();
    expect(res.body.list.length).toBeGreaterThan(0);
  });

  it("should remove comment successfully", async () => {
    const res = await request.delete(`/comment/${commentId}`).set({
      Authorization: `Bearer ${accessToken}`,
    });

    expect(res.status).toBe(200);
  });

  it("should delete user successfully", async () => {
    await User.delete({ where: { email: "jest.comment@gmail.com" } });

    const user = await User.findUnique({
      where: { email: "jest.comment@gmail.com" },
      select: { id: true },
    });

    expect(user).toBeNull();
  });
});
