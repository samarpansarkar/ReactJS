const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");

describe("API Routes", () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("GET / should return successful response", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe("API is running...");
  });
});
