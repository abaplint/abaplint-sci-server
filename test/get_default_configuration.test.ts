import app from "../src/app";
import * as request from "supertest";
import { getDefaultConfig } from "../src/api/lint_config";

test("test default config API", async () => {
  const expConf = getDefaultConfig();

  const res = await request(app).get("/api/v1/get_default_configuration");
  expect(res.status).toBe(200);
  expect(res.body).toMatchObject({
    success: 1,
    payload: expConf
  });

});