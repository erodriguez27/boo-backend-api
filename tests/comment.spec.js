const request = require("supertest");
const { describe, it, afterAll } = require("@jest/globals");
const { app } = require("../app");
const mockedCelebrity = require("./mocks/mockedCelebrity.mock.json");

describe("API / - conversations", () => {
  it("Should get 404 getting comments related to userId without comments", async () => {
    const req = await request.agent(app).get("/comments/600").expect(404);
  });
  it("Should add new comment about mockedCelebrity profile", async () => {
    const newComment = {
      title: "INTP",
      description: "He is an INTP",
      userId: "1",
      commentedUser: 999,
      mbti: "INFP",
      enneagram: "2w3",
      zodiac: "Leo",
    };
    const req = await request.agent(app)
      .post("/comments")
      .send({ ...newComment })
      .expect(200);
    const {
      body: { comment },
    } = req;
    expect(comment).toBeDefined();
    expect(comment.title).toBe(newComment.title);
    expect(comment.commentedUser).toBe(newComment.commentedUser);
  });
  it("Should get all comments created", async () => {
    const req = await request.agent(app)
      .get(`/comments/${mockedCelebrity.id}`)
      .expect(200);
    const {
      body: { results },
    } = req;
    expect(results).toBeDefined();
    expect(results.length).toBeGreaterThan(0);
  });
  it("Should get comments related to the celebrity", async () => {
    const req = await request.agent(app)
      .get(`/comments/${mockedCelebrity.id}`)
      .expect(200);
    const {
      body: { results },
    } = req;
    expect(results).toBeDefined();
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].commentedUser).toBe(mockedCelebrity.id);
  });
});
