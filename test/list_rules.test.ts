import app from "../src/app";
import * as request from "supertest";

test("test list rules API", async () => {
  const res = await request(app).get("/api/v1/list_rules");
  expect(res.status).toBe(200);
  expect(res.body).toEqual(expect.objectContaining({
    success: 1,
    payload: expect.any(Array),
  }));
  const { payload } = res.body;
  expect(payload.length).toBeGreaterThan(0);
  expect(payload[0]).toEqual(expect.objectContaining({
    key: expect.any(String),
    title: expect.any(String),
  }));
});