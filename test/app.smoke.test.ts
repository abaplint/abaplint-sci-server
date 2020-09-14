import app from "../src/app";
import * as request from "supertest";

test("smoke test: ping", async () => {
  const res = await request(app).get("/api/v1/ping");
  expect(res.status).toBe(200);
  expect(Object.keys(res.body).sort()).toEqual(["payload", "success"]);
  expect(res.body.success).toBe(1);
  expect(res.body.payload).toMatch(/Server is OK, abaplint version = \d{1,3}.\d{1,3}.\d{1,3}/);
});

test("smoke test: 404", async () => {
  const res = await request(app).get("/api/v1/zzz");
  expect(res.status).toBe(404);
  expect(res.body).toEqual({ success: 0, error:{ message: "Wrong API call" }});
});
