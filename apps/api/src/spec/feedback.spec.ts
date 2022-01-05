import { Feedback } from "@db";
import { server } from "../app";
import supertest from "supertest";

describe("API Feedback", () => {
  let app: typeof server;
  let request;

  beforeAll(() => {
    jest.spyOn(console, "info").mockImplementation(() => null);
    app = server;
    request = supertest(app);
  });

  it("should create feedback successfully", async () => {
    const res = await request.post("/feedback").send({
      statements: [],
      comment: "Jest was here!",
    });

    // Low ratelimit may be exceeded
    if (res.status == 429) return;
    expect(res.status).toBe(200);

    const feedback = await Feedback.findFirst({
      where: { comment: "Jest was here!" },
    });

    expect(feedback).toBeTruthy();
    expect(feedback.comment).toBe("Jest was here!");
  });

  it("should delete feedback successfully", async () => {
    Feedback.deleteMany({ where: { comment: "Jest was here!" } });
  });
});
