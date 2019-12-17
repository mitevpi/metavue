#!/usr/bin/env node

const yargs = require("yargs");
const metavue = require("../dist/index");

const options = yargs
  .version()
  .example(
    `metavue -d /Users/mitevpi/GitHub/stroll-app`,
    "Run metavue in the root directory of the Vue application"
  )
  .usage("Usage: -d <directory>")
  .help("h")
  .alias("h", "help")
  .option("d", {
    alias: "directory",
    describe: "Root directory of the Vue application",
    type: "string",
    demandOption: true
  })
  .epilogue(
    "for more information, find the documentation at https://www.npmjs.com/package/metavue"
  ).argv;

const dir = options.directory;

metavue.Methods.ExportParentChild(dir);
metavue.Methods.ExportArchitecture(dir);
console.log("Exports Finished", dir);
