import { Files } from "../src";

test("import Files", () => {
  expect.anything(Files);
});

test("Files.GetVue", async () => {
  const temp = await Files.GetVue("/Users/mitevpi/Documents/GitHub/stroll-app");
  expect(temp.length).toBeGreaterThan(0);

  temp.map(file => {
    expect(file).toEqual(expect.stringContaining(".vue"));
  });
});

test("Files.Read", async () => {
  const paths = await Files.GetVue(
    "/Users/mitevpi/Documents/GitHub/stroll-app"
  );
  const read = paths.map(filePath => Files.Read(filePath));
  read.map(file => {
    expect(file).toEqual(expect.stringContaining("export default"));
  });
});
