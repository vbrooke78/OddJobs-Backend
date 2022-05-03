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
    const res = await request(app).get("/api/not_a_path").expect(404);

    expect(res.body.msg).toBe("Path Not Found");
  });
});

describe("GET /api/jobs", () => {
  test("200, return list of current jobs", async () => {
    const res = await request(app).get("/api/jobs").expect(200);

    res.body.forEach((job) => {
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

describe("GET /api/users/:user_id", () => {
  test("200, return user by user_id", async () => {
    const res = await request(app).get("/api/users/000000000002").expect(200);
    console.log(res.body);

    expect(res.body.user).toMatchObject({
      _id: "303030303030303030303032",
      username: "shaunDogg",
      firstName: "Shaun",
      lastName: "Clarke",
      address: "Manchester, UK",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeik6d5EHLTi89m_CKLXyShylk4L92YflpJQ&usqp=CAU",
      email: "shuan@test.com",
      password: "testing123",
      phoneNumber: 123987456,
      rating: 4.2,
      reviews: expect.any(Array),
      messages: expect.any(Array),
    });
  });
});
