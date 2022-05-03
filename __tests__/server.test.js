const app = require("../backend/app.js");
const request = require("supertest");
const dbClient = require("../backend/db/db.js");
const seed = require("../backend/db/seeds/seed.js");
const testData = require("../backend/db/data/test-data");
const mongoose = require("mongoose");
dbClient();

beforeEach(async () => {
  await seed(testData);
});
beforeAll(() => dbClient());
afterAll(() => mongoose.disconnect());

describe("#Errors", () => {
  test("404: Path Not Found", () => {
    // Need to Implement
    expect(true).toBe(true);
  });
  test("400: Bad Request", () => {
    // Need to Implement
    expect(true).toBe(true);
  });
});

describe("GET /api/jobs/:job_id", () => {
  test("200, return job by id ", async () => {
    const res = await request(app)
      .get("/api/jobs/303030303030303030303033")
      .expect(200);
    expect(res.body.job).toEqual({
      _id: "303030303030303030303033",
      title: "Walking my dogs",
      description: "Need someone to walk my dogs everyday in the morning",
      category: "pets",
      price: 6.0,
      user_id: "303030303030303030303031",
      location: { latitude: 53.797, longitude: -1.556 },
      __v: 0,
    });
  });
});
