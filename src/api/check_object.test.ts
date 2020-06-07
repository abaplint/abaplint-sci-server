import { checkObject } from "./check_object";

test("should happily check object", () => {
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

  const output = checkObject(checkObjectInput);
  expect(output.object).toEqual({
    objectName: "ZXXX",
    objectType: "PROG"
  });
  expect(output.issues.length).toEqual(2);
});

