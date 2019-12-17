import { Files } from "../src";

// const dir = "/Users/mitevpi/Documents/GitHub/stroll-app";
const dir = "C:\\Users\\pmitev\\Documents\\GitHub\\stroll-app\\";

test("import Files", () => {
  expect.anything(Files);
});

test("Files.GetVue", async () => {
  const temp = await Files.GetVue(dir);
  expect(temp.length).toBeGreaterThan(0);

  temp.map(file => {
    expect(file).toEqual(expect.stringContaining(".vue"));
  });
});

test("Files.Read", async () => {
  const paths = await Files.GetVue(dir);
  const read = paths.map(filePath => Files.Read(filePath));
  read.map(file => {
    expect(file).toEqual(expect.stringContaining("export default"));
  });
});
