#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const yargs = require("yargs");
const metavue = require("../dist/index");

// SET UP CLI FUNCTIONALITY
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
const vizDir = path.resolve(__dirname, "viz-vue");

// COPY VISUALIZATION FILES
const dirEntries = fs.readdirSync(vizDir, { withFileTypes: true });
dirEntries.map(dirEntry => {
  const res = path.resolve(vizDir, dirEntry.name);

  if (!res.endsWith(".json")) {
    const destinationPath = path.join(dir, ".metavue", path.basename(res));
    fs.copyFile(res, destinationPath, err => {
      if (err) throw err;
      // console.log("Copied Visualization", destinationPath);
    });
  }
});

// EXPORT JSON DATA
metavue.Exports.ExportParentChild(dir);
metavue.Exports.ExportArchitecture(dir);
console.log("Exports Finished", dir);
