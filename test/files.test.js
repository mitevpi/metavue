import { Files } from "../src";

test("import Files", () => {
  expect.anything(Files);
});

test("Files.GetVue", async () => {
  const temp = await Files.GetVue(
    "C:\\Users\\pmitev\\Documents\\GitHub\\view-analysis\\src"
  );
  expect(temp.length).toBeGreaterThan(0);
});

// test("Files.GetVue", () => {
//   const temp = Files.GetVue(
//     "C:\\Users\\pmitev\\Documents\\GitHub\\view-analysis\\src"
//   );
//   expect(temp.length).toBeGreaterThan(0);
// });
