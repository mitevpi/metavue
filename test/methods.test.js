import { Methods } from "../src";

// const dir = "/Users/mitevpi/Documents/GitHub/stroll-app";
const dir = "C:\\Users\\pmitev\\Documents\\GitHub\\view-analysis\\";

test("import Methods", () => {
  expect.anything(Methods);
});

test("Methods.Architecture", async () => {
  const parsed = await Methods.Architecture(dir);
  const data = [];
  const components = [];

  expect(parsed.length).toBeGreaterThan(0);
  parsed.map(item => {
    expect(item.path).not.toBeNull();
    expect(item.name).not.toBeNull();
    data.push(item.data);
    components.push(item.components);
  });
  expect(data.length).toBeGreaterThan(0);
  expect(components.length).toBeGreaterThan(0);
});

test("Methods.ParentChild", async () => {
  const parsed = await Methods.ParentChild(dir);

  expect(parsed.length).toBeGreaterThan(0);
  parsed.map(item => {
    expect(item.parent).not.toBeNull();
    expect(item.child).not.toBeNull();
  });
});

test("Methods.ExportParentChild", async () => {
  const result = await Methods.ExportParentChild(dir);
  expect(result).toBeTruthy();
});

test("Methods.ExportArchitecture", async () => {
  const result = await Methods.ExportArchitecture(dir);
  expect(result).toBeTruthy();
});
