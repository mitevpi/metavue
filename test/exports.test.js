import { Exports } from "../src";

const dir = process.env.METAVUE_DIR;

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
