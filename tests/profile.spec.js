const request = require("supertest");
const { describe, it, afterAll } = require('@jest/globals');
const { app } = require("../app");

describe("API / - conversations", () => {
    it("Should get mocked profile", async () => {
        const req = await request(app).get('/').expect(200);
		expect(req.type).toBe('text/html');
        expect(req.text).toBeDefined();
	});
})
