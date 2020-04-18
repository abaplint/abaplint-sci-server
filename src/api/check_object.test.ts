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
  expect(output).toEqual({
    object: {
      objectName: "ZXXX",
      objectType: "PROG"
    },
    issues: [
      {
        message: "Keyword should be upper case: \"write\"",
        key: "keyword_case",
        start: {
          row: 4,
          col: 1
        },
        end: {
          row: 4,
          col: 6
        },
        "filename": "zxxx.prog.abap"
      },
      {
        message: "Indentation problem, expected 0 spaces",
        key: "indentation",
        start: {
          row: 3,
          col: 3
        },
        end: {
          row: 3,
          col: 26
        },
        filename: "zxxx.prog.abap"
      }
    ]
  });
});

