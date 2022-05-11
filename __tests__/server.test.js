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
        postcode: {
          lat: expect.any(Number),
          lng: expect.any(Number),
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
      postcode: {
        lat: expect.any(Number),
        lng: expect.any(Number),
      },
      status: expect.any(Boolean),
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

    expect(res.body.msg).toBe("ID Not Found");
  });
});

describe("GET /api/users/:user_id", () => {
  test("200, return user by user_id", async () => {
    const res = await request(app).get("/api/users/000000000002").expect(200);

    expect(res.body.user).toMatchObject({
      _id: "303030303030303030303032",
      username: "shaunDogg",
      fullName: "Shaun Clarke",
      email: "shaun@test.com",
      password: expect.any(String),
      phoneNumber: 123987456,
      rating: 4.2,
      reviews: expect.any(Array),
      messages: expect.any(Array),
    });
  });
  test("404, invalid user id!", async () => {
    const res = await request(app).get("/api/users/notAnId").expect(400);
    // console.log(res, "res<<<<<<<<<<<<<");
    expect(res.body.msg).toBe("Invalid ID Format");
  });
  test("404, user not found!", async () => {
    const res = await request(app)
      .get("/api/users/303030303030363030303032")
      .expect(404);
    // console.log(re, "res<<<<<<<<<<<<<");
    expect(res.body.msg).toBe("ID Not Found");
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
      password: expect.any(String),
    });
  });

  test("400: Username already exists", async () => {
    const requestBody = {
      username: "shaunDogg",
      fullName: "my name",
      email: "myemail@email.com",
      password: "test123",
    };

    const res = await request(app)
      .post("/api/users/register")
      .send(requestBody)
      .expect(400);

    expect(res.body.msg).toBe("Username already exists");
  });

  test("400: Email already exists", async () => {
    const requestBody = {
      username: "username1",
      fullName: "my name",
      email: "shaun@test.com",
      password: "test123",
    };

    const res = await request(app)
      .post("/api/users/register")
      .send(requestBody)
      .expect(400);

    expect(res.body.msg).toBe("Email already exists");
  });

  test("400: Invalid Post Object", async () => {
    const requestBody = {
      username: "username1",
      password: "test123",
    };

    const res = await request(app)
      .post("/api/users/register")
      .send(requestBody)
      .expect(400);

    expect(res.body.msg).toBe("Invalid Post Object");
  });
});

describe("DELETE /api/users/:user_id", () => {
  test("204, delete user", async () => {
    const res = await request(app)
      .delete("/api/users/000000000002")
      .send({ password: "testing123" })
      .expect(204);

    expect(res.body).toEqual({});
  });
  test("400, invalid user id", async () => {
    const res = await request(app).delete("/api/users/notAnId").expect(400);
    // console.log(res, "res<<<<<<<<<<<<<");
    expect(res.body.msg).toBe("Invalid ID Format");
  });
  test("404, user doesn't exist", async () => {
    const res = await request(app)
      .delete("/api/users/303030303030363030303032")
      .expect(404);
    // console.log(res, "res<<<<<<<<<<<<<");
    expect(res.body.msg).toBe("ID Not Found");
  });
});

describe("POST /api/users/login", () => {
  test("201, login with a user", async () => {
    const requestBody = {
      username: "shaunDogg",
      password: "testing123",
    };
    const res = await request(app)
      .post("/api/users/login")
      .send(requestBody)
      .expect(201);
    expect(res.body.userLogin).toEqual({
      token: expect.any(String),

      user_id: expect.any(String),
    });
  });
});

test("404, username not found", async () => {
  const requestBody = {
    username: "not_a_username",
    password: "testing123",
  };
  const res = await request(app)
    .post("/api/users/login")
    .send(requestBody)
    .expect(404);

  expect(res.body.msg).toEqual("ID Not Found");
});

test("400, invalid password", async () => {
  const requestBody = {
    username: "shaunDogg",
    password: "invalid",
  };
  const res = await request(app)
    .post("/api/users/login")
    .send(requestBody)
    .expect(400);

  expect(res.body.msg).toEqual("Invalid password");
});

describe("DELETE /api/jobs/:job_id", () => {
  test("202, delete job", async () => {
    const res = await request(app)
      .delete("/api/jobs/303030303030303030303033")
      .expect(204);
    //  expect(res.body).toEqual({ status: "Job deleted" });
  });
  test("400, invalid job id", async () => {
    const res = await request(app).delete("/api/users/notAnId").expect(400);
    // console.log(res, "res<<<<<<<<<<<<<");
    expect(res.body.msg).toBe("Invalid ID Format");
  });
  test("404, job doesn't exist", async () => {
    const res = await request(app)
      .delete("/api/users/303030303030363030303032")
      .expect(404);
    // console.log(res, "res<<<<<<<<<<<<<");
    expect(res.body.msg).toBe("ID Not Found");
  });
});

describe("PUT /api/users/:user_id", () => {
  test("202, updates user details", async () => {
    const requestBody = {
      phoneNumber: 321,
      email: "user@example.com",
      fullName: "new name",
      username: "tester",
    };
    const res = await request(app)
      .put("/api/users/000000000002")
      .send(requestBody)
      .expect(202);

    expect(res.body.user).toMatchObject({
      phoneNumber: 321,
      email: "user@example.com",
      fullName: "new name",
      username: "tester",
    });
  });

  test("400, invalid user id", async () => {
    const res = await request(app).get("/api/users/notAnId").expect(400);
    // console.log(res, "res<<<<<<<<<<<<<");
    expect(res.body.msg).toBe("Invalid ID Format");
  });
  test("404, user doesn't exist", async () => {
    const res = await request(app)
      .put("/api/users/303030303030363030303032")
      .expect(404);
    // console.log(res, "res<<<<<<<<<<<<<");
    expect(res.body.msg).toBe("ID Not Found");
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
      postcode: { lat: 53.797, lng: -1.556 },
    };
    const res = await request(app)
      .post("/api/jobs")
      .send(requestBody)
      .expect(201);

    expect(res.body.job).toEqual({
      __v: 0,
      _id: expect.any(String),
      title: "fake title",
      description: "fake description",
      price: 69,
      category: "fake category",
      user_id: "303030303030303030303031",
      postcode: { lat: 53.797, lng: -1.556 },
      status: false,
    });
  });

  test("400: Invalid Post Object", async () => {
    const requestBody = {
      description: "fake description",

      user_id: "000000000001",
      postcode: { latitude: 53.797, longitude: -1.556 },
      category: "fake",
    };
    const res = await request(app)
      .post("/api/jobs")
      .send(requestBody)
      .expect(400);

    expect(res.body.msg).toEqual("Invalid Post Object");
  });
});

describe.only("PUT /api/jobs/:id", () => {
  test("202, updates job details", async () => {
    const requestBody = {
      title: "Walking my dogs",
      description: "Need someone to walk my dogs everyday in the morning",
      price: 7.0,
      category: "pets",
      user_id: "000000000001",
      postcode: { lat: 53.797, lng: -1.556 },
      status: true,
    };
    const res = await request(app)
      .put("/api/jobs/000000000002")
      .send(requestBody)
      .expect(202);

    expect(res.body.job).toMatchObject({
      title: "Walking my dogs",
      description: "Need someone to walk my dogs everyday in the morning",
      price: 7.0,
      category: "pets",
      user_id: "303030303030303030303031",
      postcode: { lat: 53.797, lng: -1.556 },
      status: true,
    });
  });
});

describe("GET /api/jobs/category", () => {
  test("200, return list of jobs by category", async () => {
    const res = await request(app).get("/api/jobs/?category=DIY");
    console.log(res.body);
    res.body.jobs.forEach((oneJob) => {
      expect(oneJob).toMatchObject({
        _id: expect.any(String),
        title: expect.any(String),
        category: "DIY",
        price: expect.any(Number),
        user_id: expect.any(String),
        postcode: {
          lat: expect.any(Number),
          lng: expect.any(Number),
        },
      });
    });
  });
  test("200, check code did not break", async () => {
    const res = await request(app).get("/api/jobs/?category=pets");
    console.log(res.body);
    res.body.jobs.forEach((oneJob) => {
      expect(oneJob).toMatchObject({
        _id: expect.any(String),
        title: expect.any(String),
        category: "pets",
        price: expect.any(Number),
        user_id: expect.any(String),
        postcode: {
          lat: expect.any(Number),
          lng: expect.any(Number),
        },
      });
    });
  });
  test("200, check code did not break", async () => {
    const res = await request(app).get("/api/jobs/?category=");
    console.log(res.body);
    res.body.jobs.forEach((oneJob) => {
      expect(oneJob).toMatchObject({
        _id: expect.any(String),
        title: expect.any(String),
        category: expect.any(String),
        price: expect.any(Number),
        user_id: expect.any(String),
        postcode: {
          lat: expect.any(Number),
          lng: expect.any(Number),
        },
      });
    });
  });
});

describe("POST /api/messages", () => {
  test("201, post a new job", async () => {
    const requestBody = {
      users: [
        { userId: "000000000001", unread: 0 },
        { userId: "000000000002", unread: 0 },
      ],
    };
    const res = await request(app)
      .post("/api/messages")
      .send(requestBody)
      .expect(200);

    expect(res.body.message).toEqual({
      __v: 0,
      _id: expect.any(String),
      users: [
        { userId: expect.any(String), _id: expect.any(String), unread: 0 },
        { userId: expect.any(String), _id: expect.any(String), unread: 0 },
      ],
      messages: [],
    });
  });
});

describe("PUT /api/messages/:message_id/:content_id", () => {
  test("202, updates job details", async () => {
    const requestBody = {
      content: "updated text",
      user_id: "000000000003",
      unread: true,
    };
    const res = await request(app)
      .put("/api/messages/000000000004/000000000099")
      .send(requestBody)
      .expect(202);

    expect(res.body.message).toEqual({
      _id: "303030303030303030303034",
      users: [
        {
          userId: expect.any(String),
          _id: expect.any(String),
          unread: 1,
        },
        {
          userId: expect.any(String),
          _id: expect.any(String),
          unread: 2,
        },
      ],
      messages: [
        {
          userId: "303030303030303030303034",
          content_type: "text",
          content: "I can lend you a tool for the job",
          _id: "303030303030303030303937",
          unread: false,
        },
        {
          userId: expect.any(String),
          content_type: "text",
          content: "updated text",
          _id: expect.any(String),
          unread: false,
        },
        {
          userId: expect.any(String),
          content_type: "text",
          content: "Are you free this afternoon?",
          _id: expect.any(String),
          unread: true,
        },
        {
          userId: expect.any(String),
          content_type: "text",
          content: "Yes",
          _id: expect.any(String),
          unread: true,
        },
        {
          userId: expect.any(String),
          content_type: "text",
          content: "Ok, I will drop it round",
          _id: expect.any(String),
          unread: true,
        },
      ],

      __v: 0,
    });
  });
});

describe("GET /api/messages/:message_id", () => {
  test("201, post a new message board", async () => {
    const res = await request(app)
      .get("/api/messages/000000000004")
      .expect(200);
    console.log(res.body);
    expect(res.body.message).toEqual({
      __v: 0,
      _id: expect.any(String),
      messages: expect.any(Array),
      users: [
        {
          userId: {
            _id: expect.any(String),
            fullName: expect.any(String),
            username: expect.any(String),
          },
          unread: 1,
          _id: expect.any(String),
        },
        {
          userId: {
            _id: expect.any(String),
            fullName: expect.any(String),
            username: expect.any(String),
          },
          unread: 2,
          _id: expect.any(String),
        },
      ],
    });
  });
});

describe("POST /api/messages/:message_id", () => {
  test("201, post new content", async () => {
    const requestBody = {
      userId: "000000000004",
      content_type: "text",
      content: "updated text",
    };
    const res = await request(app)
      .post("/api/messages/000000000004")
      .send(requestBody)
      .expect(200);

    expect(res.body.message).toEqual({
      __v: 0,
      _id: expect.any(String),
      users: [
        {
          userId: {
            _id: expect.any(String),
            fullName: expect.any(String),
            username: expect.any(String),
          },
          unread: 1,
          _id: expect.any(String),
        },
        {
          userId: {
            _id: expect.any(String),
            fullName: expect.any(String),
            username: expect.any(String),
          },
          unread: 3,
          _id: expect.any(String),
        },
      ],
      messages: [
        {
          _id: expect.any(String),
          content: "updated text",
          content: "I can lend you a tool for the job",
          content_type: "text",
          userId: expect.any(String),
          unread: false,
        },
        {
          _id: expect.any(String),
          content: "Thanks, that is helpful",
          content_type: "text",
          userId: "303030303030303030303031",
          unread: false,
        },
        {
          _id: expect.any(String),
          content: "Are you free this afternoon?",
          content_type: "text",
          userId: "303030303030303030303034",
          unread: true,
        },
        {
          _id: expect.any(String),
          content: "Yes",
          content_type: "text",
          userId: "303030303030303030303031",
          unread: true,
        },
        {
          _id: expect.any(String),
          content: "Ok, I will drop it round",
          content_type: "text",
          userId: "303030303030303030303034",
          unread: true,
        },
        {
          _id: expect.any(String),
          content: "updated text",
          content_type: "text",
          userId: "303030303030303030303034",
          unread: true,
        },
      ],
    });
  });
});

describe("DELETE /api/messages/:message_id/:content_id", () => {
  test("204, delete messages", async () => {
    const res = await request(app)
      .delete("/api/messages/000000000002/000000000002")
      .expect(204);

    expect(res.body).toEqual({});
  });
});

describe("GET /api/messages/:user_id/:message_id", () => {
  test("200, get user content", async () => {
    const res = await request(app)
      .get("/api/messages/000000000004/000000000004")
      .expect(200);
    // console.log(res.body);
    expect(res.body.message).toEqual({
      __v: 0,
      _id: expect.any(String),
      messages: [
        {
          _id: expect.any(String),
          content: "updated text",
          content: "I can lend you a tool for the job",
          content_type: "text",
          userId: expect.any(String),
          unread: false,
        },
        {
          _id: expect.any(String),
          content: "Thanks, that is helpful",
          content_type: "text",
          userId: "303030303030303030303031",
          unread: false,
        },
        {
          _id: expect.any(String),
          content: "Are you free this afternoon?",
          content_type: "text",
          userId: "303030303030303030303034",
          unread: false,
        },
        {
          _id: expect.any(String),
          content: "Yes",
          content_type: "text",
          userId: "303030303030303030303031",
          unread: true,
        },
        {
          _id: expect.any(String),
          content: "Ok, I will drop it round",
          content_type: "text",
          userId: "303030303030303030303034",
          unread: false,
        },
      ],
      users: [
        {
          userId: {
            _id: expect.any(String),
            fullName: expect.any(String),
            username: expect.any(String),
          },
          unread: 1,
          _id: expect.any(String),
        },
        {
          userId: {
            _id: expect.any(String),
            fullName: expect.any(String),
            username: expect.any(String),
          },
          unread: 0,
          _id: expect.any(String),
        },
      ],
    });
  });
});

describe("GET /api/chats/", () => {
  test("200, get user content", async () => {
    const res = await request(app)
      .get("/api/messages/chats/000123400001")
      .expect(200);

    expect(res.body.message).toEqual([
      {
        _id: "303030303030303030303031",
        messages: expect.any(Array),
        users: expect.any(Array),
        __v: 0,
      },
      {
        _id: "303030303030303030303033",
        messages: expect.any(Array),
        users: expect.any(Array),
        __v: 0,
      },
    ]);
  });
});
