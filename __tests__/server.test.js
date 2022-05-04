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

describe("GET /api/users", () => {
  test("200, return list of current users", async () => {
    const res = await request(app).get("/api/users").expect(200);

    res.body.users.forEach((user) => {
      expect(user).toMatchObject({
        _id: expect.any(String),
        username: expect.any(String),
        fullName: expect.any(String),
        address: expect.any(Array),
        img: expect.any(String),
        email: expect.any(String),
        password: expect.any(String),
        phoneNumber: expect.any(Number),
        rating: expect.any(Number),
        reviews: expect.any(Array),
        messages: expect.any(Array),
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
    const res = await request(app).get("/api/jobs/not_an_id").expect(400);

    expect(res.body.msg).toBe("Invalid ID Format");
  });

  test("404: ID Path not found", async () => {
    const res = await request(app)
      .get("/api/jobs/203030303030303030303033")
      .expect(404);
    
      //WTFFFFF!!!!! res.body is undefined?!!!
      console.log(res.text);

      expect(res.text).toBe("ID Not Found");
  });
});

xdescribe("GET /api/users/:user_id", () => {
  test("200, return user by user_id", async () => {
    const res = await request(app).get("/api/users/000000000002").expect(200);
    
    expect(res.body.user).toMatchObject({
      _id: "303030303030303030303032",
      username: "shaunDogg",
      fullName: "Shaun Clarke",
      address: expect.any(Array),
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeik6d5EHLTi89m_CKLXyShylk4L92YflpJQ&usqp=CAU",
      email: "shaun@test.com",
      password: "testing123",
      phoneNumber: 123987456,
      rating: 4.2,
      reviews: expect.any(Array),
      messages: expect.any(Array),
    });
  });
});

describe("POST /api/users/register", () => {

  test("201, register a user", async () => {
    const requestBody = {
      username: "username1",
      fullName: "my name",
      email: "myemail@email.com",
      password: "test123",
    };

    const res = await request(app)
      .post("/api/users/register")
      .send(requestBody)
      .expect(201);

    expect(res.body.user).toMatchObject({
      username: "username1",
      fullName: "my name",
      email: "myemail@email.com",
      password: expect.any(String)
      });
  });
});


// describe("DELETE /api/users/:user_id", () => {
//   test("204, delete user", async () => {
//     const res = await request(app)
//       .delete("/api/users/000000000002")
//       .send({ password: "testing123" })
//       .expect(202);
//     expect(res.body).toEqual({
//       status: "User deleted",
//     });
//   });
// });

describe("DELETE /api/jobs/:job_id", () => {
  test("202, delete job", async () => {
    const res = await request(app)
      .delete("/api/jobs/303030303030303030303033")
      .expect(202);
    expect(res.body).toEqual({ status: "Job deleted" });
  });
});

describe("PUT /api/users/:user_id", () => {
  test("202, updates user details", async () => {
    const requestBody = {
      address: [{ city: "Leeds", street: "street", postCode: "code" }],
      phoneNumber: 321,
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Souvenir_silhouette_post_card._Toledo%27s_greatest_store%3B_Tiedtke%27s._The_store_for_all_the_people_-_DPLA_-_f00a78fe61c216236a13cdebf588d3c3_%28page_1%29.jpg/220px-Souvenir_silhouette_post_card._Toledo%27s_greatest_store%3B_Tiedtke%27s._The_store_for_all_the_people_-_DPLA_-_f00a78fe61c216236a13cdebf588d3c3_%28page_1%29.jpg",
    };
    const res = await request(app)
      .put("/api/users/000000000002")
      .send(requestBody)
      .expect(202);
    console.log(res);
    expect(res.body).toEqual({ status: "User details updated!" }); 
    });
});

describe("POST /api/jobs", () => {
  test("201, post a new job", async () => {
    const requestBody = {
      title: "fake title",
      description: "fake description",
      price: 69,
      category: "fake category",
      user_id: "000000000001",
      location: { latitude: 53.797, longitude: -1.556 },
    };
    const res = await request(app)
      .post("/api/jobs")
      .send(requestBody)
      .expect(201);
    console.log(res.body);
    expect(res.body.job).toEqual({
      __v: 0,
      _id: expect.any(String),
      title: "fake title",
      description: "fake description",
      price: 69,
      category: "fake category",
      user_id: "303030303030303030303031",
      location: { latitude: 53.797, longitude: -1.556 },
    });
  });
});

