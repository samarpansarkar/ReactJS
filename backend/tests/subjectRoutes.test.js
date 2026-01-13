const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");
const User = require("../models/User");
const Subject = require("../models/Subject");

let token;

beforeAll(async () => {
  // Creating a test admin user for authentication
  const user = await User.create({
    name: "Test Admin",
    email: "admin@test.com",
    password: "password123",
    isAdmin: true,
  });

  const res = await request(app)
    .post("/api/auth/login")
    .send({ email: "admin@test.com", password: "password123" });

  token = res.body.token;
});

afterAll(async () => {
  await User.deleteMany({});
  await Subject.deleteMany({});
  await mongoose.connection.close();
});

describe("Subject Routes", () => {
  beforeEach(async () => {
    await Subject.deleteMany({});
  });

  it("should create a new subject", async () => {
    const res = await request(app)
      .post("/api/subjects")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "React",
        title: "React Concepts",
        path: "/react",
        icon: "Zap",
        color: "text-blue-500",
        order: 1,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("React");
  });

  it("should get all subjects", async () => {
    await Subject.create({
      name: "React",
      title: "React Concepts",
      path: "/react",
      icon: "Zap",
      color: "text-blue-500",
      order: 1,
    });

    const res = await request(app).get("/api/subjects");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe("React");
  });

  it("should update a subject", async () => {
    const subject = await Subject.create({
      name: "React",
      title: "React Concepts",
      path: "/react",
      icon: "Zap",
      color: "text-blue-500",
      order: 1,
    });

    const res = await request(app)
      .put(`/api/subjects/${subject._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Advanced React",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Advanced React");
  });

  it("should delete a subject", async () => {
    const subject = await Subject.create({
      name: "React",
      title: "React Concepts",
      path: "/react",
      icon: "Zap",
      color: "text-blue-500",
      order: 1,
    });

    const res = await request(app)
      .delete(`/api/subjects/${subject._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);

    const check = await Subject.findById(subject._id);
    expect(check).toBeNull();
  });
});
