import { Methods } from "../src";

const dir = "/Users/mitevpi/Documents/GitHub/stroll-app";

test("import Methods", () => {
  expect.anything(Methods);
});

// test("Methods.ParseStructure", async () => {
//   const parsed = await Methods.ParseStructure(dir);
//   expect(parsed.length).toBeGreaterThan(0);
// });

// test("Methods.ParentChild", async () => {
//   const parsed = await Methods.ParentChild(dir);
//   expect(parsed.length).toBeGreaterThan(0);
// });

test("Methods.ExportParentChild", async () => {
  const result = await Methods.ExportParentChild(dir);
  expect(result).toBeTruthy();
});
