const request = require("supertest");
const { describe, it, afterAll } = require('@jest/globals');
const { app } = require("../app");

const mockedProfile = {
  id: 1,
  name: "A Martinez",
  description: "Adolph Larrue Martinez III.",
  mbti: "ISFJ",
  enneagram: "9w3",
  variant: "sp/so",
  tritype: 725,
  socionics: "SEE",
  sloan: "RCOEN",
  psyche: "FEVL",
  image: "https://soulverse.boo.world/images/1.png",
};

describe("API / - conversations", () => {
    it("Should get mocked profile", async () => {
        const req = await request(app).get('/').expect(200);
		expect(req.type).toBe('text/html');
        expect(req.text).toBeDefined();
	});
})
