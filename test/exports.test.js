import { Exports } from "../src";

// const dir = "/Users/mitevpi/Documents/GitHub/stroll-app";
const dir = "C:\\Users\\pmitev\\Documents\\GitHub\\view-analysis\\";

test("import Methods", () => {
  expect.anything(Exports);
});

test("Methods.ExportParentChild", async () => {
  const result = await Exports.ExportParentChild(dir);
  expect(result).toBeTruthy();
});

test("Methods.ExportArchitecture", async () => {
  const result = await Exports.ExportArchitecture(dir);
  expect(result).toBeTruthy();
});
