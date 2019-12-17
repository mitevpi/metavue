import { Analysis } from "../src";

const dir = "/Users/mitevpi/Documents/GitHub/stroll-app";
// const dir = "C:\\Users\\pmitev\\Documents\\GitHub\\view-analysis\\";

test("import Analysis", () => {
  expect.anything(Analysis);
});

test("Analysis.Architecture", async () => {
  const parsed = await Analysis.Architecture(dir);
  const data = [];
  const components = [];
  const template = [];
  const script = [];
  const style = [];

  expect(parsed.length).toBeGreaterThan(0);
  parsed.map(item => {
    expect(item.path).not.toBeNull();
    expect(item.name).not.toBeNull();
    data.push(item.data);
    components.push(item.components);
    template.push(item.template);
    script.push(item.script);
    style.push(item.style);
  });
  expect(data.length).toBeGreaterThan(0);
  expect(components.length).toBeGreaterThan(0);
  expect(script.length).toBeGreaterThan(0);
  expect(style.length).toBeGreaterThan(0);
  expect(template.length).toBeGreaterThan(0);
});

test("Analysis.ParentChild", async () => {
  const parsed = await Analysis.ParentChild(dir);

  expect(parsed.length).toBeGreaterThan(0);
  parsed.map(item => {
    expect(item.parent).not.toBeNull();
    expect(item.child).not.toBeNull();
  });
});
