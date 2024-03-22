const mongoose = require('mongoose');
const request = require("supertest");
const { describe, it, afterAll } = require("@jest/globals");
const { app } = require("../app");
const { stopDatabaseServer } = require("../clients/database");
const newUser = require("./mocks/mockedUser.mock.json");

describe("profile", () => {
  afterAll(() => {
		mongoose.disconnect();
		stopDatabaseServer();
	});

  it("Should get mocked profile", async () => {
    const req = await request(app).get("/").expect(200);
    expect(req.type).toBe("text/html");
    expect(req.text).toBeDefined();
  });
  it("Should return 400 status due to no having name in request", async () => {
    await request(app).post("/").send({...newUser, name: undefined}).expect(400);
  });
  it("Should create an user profile", async () => {
    const req = await request(app).post("/").send({...newUser}).expect(200);
    expect(req.type).toBe("text/html");
    expect(req.text).toBeDefined();
    expect(req.text.includes('Kawasaki')).toBe(true);
    expect(req.text.includes(newUser.description)).toBe(true);
  });
  it("Should get 404 when searching by incorrect userId", async () => {
    const mockedUserId = "500";
    await request(app).get(`/${mockedUserId}`).expect(404);
  });
  it("Should get user profile for previous create user", async () => {
    const req = await request(app).get(`/1`).expect(200);
    expect(req.type).toBe("text/html");
    expect(req.text).toBeDefined();
    expect(req.text.includes('Kawasaki')).toBe(true);
    expect(req.text.includes(newUser.description)).toBe(true);
  })
});
