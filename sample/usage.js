const metavue = require("../dist/index");

const dir = "/Users/mitevpi/Documents/GitHub/stroll-app";
console.log(metavue);

// metavue.Methods.ParseStructure(dir).then(result => {
//   console.log(result);
// });

metavue.Methods.ExportParentChild(dir);
metavue.Methods.ExportArchitecture(dir);
