import { Methods } from "../src";

const dir = "/Users/mitevpi/Documents/GitHub/stroll-app";

test("import Methods", () => {
  expect.anything(Methods);
});

test("Methods.Architecture", async () => {
  const parsed = await Methods.Architecture(dir);
  expect(parsed.length).toBeGreaterThan(0);
});

test("Methods.ParentChild", async () => {
  const parsed = await Methods.ParentChild(dir);
  expect(parsed.length).toBeGreaterThan(0);
});

test("Methods.ExportParentChild", async () => {
  const result = await Methods.ExportParentChild(dir);
  expect(result).toBeTruthy();
});

test("Methods.ExportArchitecture", async () => {
  const result = await Methods.ExportArchitecture(dir);
  expect(result).toBeTruthy();
});
