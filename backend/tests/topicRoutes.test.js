const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");
const User = require("../models/User");
const Topic = require("../models/Topic");

let token;

beforeAll(async () => {
  // Authenticate as Admin
  await User.deleteMany({});
  const user = await User.create({
    name: "Test Admin",
    email: "topicadmin@test.com",
    password: "password123",
    isAdmin: true,
  });

  const res = await request(app)
    .post("/api/auth/login")
    .send({ email: "topicadmin@test.com", password: "password123" });

  token = res.body.token;
});

afterAll(async () => {
  await User.deleteMany({});
  await Topic.deleteMany({});
  await mongoose.connection.close();
});

describe("Topic Routes", () => {
  it("should filter topics by subject", async () => {
    await Topic.create({
      topicId: "react-hooks",
      title: "React Hooks",
      category: "core",
      section: "hooks",
      subject: "react",
    });

    await Topic.create({
      topicId: "js-async",
      title: "Async JS",
      category: "core",
      section: "concepts",
      subject: "js",
    });

    // Test filtering for React
    const resReact = await request(app).get("/api/topics?subject=react");
    expect(resReact.statusCode).toBe(200);
    expect(resReact.body.length).toBe(1);
    expect(resReact.body[0].subject).toBe("react");

    // Test filtering for JS
    const resKS = await request(app).get("/api/topics?subject=js");
    expect(resKS.statusCode).toBe(200);
    expect(resKS.body.length).toBe(1);
    expect(resKS.body[0].subject).toBe("js");
  });

  it("should update topic by ID", async () => {
    const topic = await Topic.create({
      topicId: "update-test",
      title: "Original Title",
      category: "test",
      subject: "test",
    });

    const res = await request(app)
      .put(`/api/topics/${topic._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Updated Title",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Updated Title");
  });
});
