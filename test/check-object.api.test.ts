import app from "../src/app";
import * as request from "supertest";

test("should check file", async () => {
  const config = {
    "syntax": { "version": "v702" },
    "rules": {
      "indentation": true,
      "keyword_case": { "style": "upper" }
    }
  };
  const file = `
REPORT zxxx.
  DATA lvstr TYPE string.
write 'Hello world'.`;

  const checkObjectInput = {
    configuration: Buffer.from(JSON.stringify(config)).toString("base64"),
    object: {
      objectName: "ZXXX",
      objectType: "PROG",
    },
    files: [
      {
        name: "zxxx.prog.abap",
        contents: Buffer.from(file).toString("base64"),
      }
    ]
  };

  // maybe use https://github.com/Dean177/jest-to-match-shape-of
  const res = await request(app).post("/api/v1/check_file").send(checkObjectInput);
  expect(res.status).toBe(200);
  expect(typeof res.body).toBe("object");
  expect(res.body.object).toEqual({
    objectName: "ZXXX",
    objectType: "PROG",
  });
  expect(Array.isArray(res.body.issues)).toBeTruthy();
  expect(res.body.issues.length).toBe(2);
});
