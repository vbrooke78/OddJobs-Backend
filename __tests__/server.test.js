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

describe("General Errors", () => {

  test("404: Path Not Found", async () => {
    const res = await request(app).get("/api/not_a_path")
      .expect(404);

    expect(res.body.msg).toBe("Path Not Found");
  });
});


describe("GET /api/jobs", () => {

  test("200, return list of current jobs", async () => {
    const res = await request(app).get("/api/jobs").expect(200);

    res.body.jobs.forEach((job) => {
    
      expect(job).toMatchObject({
        _id: expect.any(String),
        title: expect.any(String),
        category: expect.any(String),
        price: expect.any(Number),
        user_id: expect.any(String),
        location: {
          latitude: expect.any(Number),
          longitude: expect.any(Number),
        },
      });
    });
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

  test("400: Invalid ID Type (mongo id's are 12byte strings)", async () => {
    
    const res = await request(app)
      .get("/api/jobs/not_an_id")
      .expect(400);

    expect(res.body.msg).toBe("Invalid ID Format");
  });

  test("404: ID Path not found", async () => {

    const res = await request(app)
      .get("/api/jobs/203030303030303030303033")
      .expect(404);

      expect(res.body.msg).toBe("ID Not Found")
  })



});
