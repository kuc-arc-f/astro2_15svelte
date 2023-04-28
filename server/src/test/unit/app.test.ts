

const request = require('supertest')
import {app}  from '../../index'

describe("GET /", () => {
  test("check: running string", async () => {
    const response = await request(app).get("/");
    console.log("name=", response.body.name);
//    expect(response.body.status).toBe("running");
    expect(response.statusCode).toBe(200);
  });
});
//
