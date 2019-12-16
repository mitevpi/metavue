import { Methods } from "../src";

test("import Methods", () => {
  expect.anything(Methods);
});

test("Methods.ParseStructure", async () => {
  const parsed = await Methods.ParseStructure(
    "C:\\Users\\pmitev\\Documents\\GitHub\\stroll-app\\src"
  );
  expect(parsed.length).toBeGreaterThan(0);
});
