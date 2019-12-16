import { Files } from "../src";

test("import Files", () => {
  expect.anything(Files);
});

test("Files.GetVue", async () => {
  const temp = await Files.GetVue(
    "C:\\Users\\pmitev\\Documents\\GitHub\\stroll-app\\src"
  );
  expect(temp.length).toBeGreaterThan(0);

  temp.map(file => {
    expect(file).toEqual(expect.stringContaining(".vue"));
  });
});

test("Files.Read", async () => {
  const paths = await Files.GetVue(
    "C:\\Users\\pmitev\\Documents\\GitHub\\stroll-app\\src"
  );
  const read = paths.map(filePath => Files.Read(filePath));
  read.map(file => {
    expect(file).toEqual(expect.stringContaining("export default"));
  });
});
