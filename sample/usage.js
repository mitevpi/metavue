const metavue = require("../dist/index");

console.log(metavue);

metavue.Methods.ParseStructure(
  "/Users/mitevpi/Documents/GitHub/stroll-app"
).then(result => {
  console.log(result);
});
