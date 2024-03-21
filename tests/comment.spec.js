const request = require("supertest");
const { describe, it, afterAll } = require("@jest/globals");
const { app } = require("../app");
const mockedCelebrity = require("./mocks/mockedCelebrity.mock.json");

describe("API / - conversations", () => {
  it("Should get 404 getting comments related to unexisting userId", async () => {
    await request(app).get("/comments/500").expect(404);
  });
  it("Should get all comments created", async () => {
    const req = await request(app)
      .get(`/comments/${mockedCelebrity.id}`)
      .expect(200);
      const {
        body: { results },
      } = req;
      expect(results).toBeDefined();
      expect(results.length).toBeGreaterThan(0);
  });
  it("Should get comments related to the celebrity", async () => {
    const req = await request(app)
      .get(`/comments/${mockedCelebrity.id}`)
      .expect(200);
    const {
      body: { results },
    } = req;
    expect(results).toBeDefined();
    expect(results.length).toBeGreaterThan(0);
    expecte(results[0].commentedUser).toBe(mockedCelebrity.id);
  });
});
