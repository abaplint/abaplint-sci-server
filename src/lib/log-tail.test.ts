import { addInfo, getLogTail } from "./log-tail";

test("should add", () => {
  addInfo("hello");
  addInfo("world");
  expect(getLogTail()).toEqual([
    "hello",
    "world",
  ]);
});
