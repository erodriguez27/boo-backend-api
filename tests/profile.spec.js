const request = require("supertest");
const { describe, it, afterAll } = require("@jest/globals");
const { app } = require("../app");
const newUser = require("./mocks/mockedUser.mock.json");

describe("API / - conversations", () => {
  it("Should get mocked profile", async () => {
    const req = await request(app).get("/").expect(200);
    expect(req.type).toBe("text/html");
    expect(req.text).toBeDefined();
  });
  it("Should create an user profile", async () => {
    const req = await request(app).post("/").send({...newUser}).expect(200);
    expect(req.type).toBe("text/html");
    expect(req.text).toBeDefined();
    expect(req.text.includes('Kawasaki')).toBe(true);
    expect(req.text.includes(newUser.description)).toBe(true);
  });
});
