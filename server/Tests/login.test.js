const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../server");

require("dotenv").config();


describe("test Login, expected to pass", () => {
  it("should return a 200 status code and a message", async () => {
    const response = await request(app).get("/api/users/login");
    expect(response.status).toBe(200);
  });
});
