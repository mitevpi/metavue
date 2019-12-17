#!/usr/bin/env node

const yargs = require("yargs");
const metavue = require("../dist/index");

const options = yargs.usage("Usage: -d <directory>").option("d", {
  alias: "directory",
  describe: "Root directory of the Vue application",
  type: "string",
  demandOption: true
}).argv;

const dir = options.directory;

metavue.Methods.ExportParentChild(dir);
metavue.Methods.ExportArchitecture(dir);
console.log("Exports Finished", dir);
