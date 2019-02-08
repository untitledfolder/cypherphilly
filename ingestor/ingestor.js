#!/usr/local/bin/node

var fs = require("fs");
var prettyjson = require("prettyjson");

if (process.argv.length !== 3) {
  console.log("Must specify what to ingest");
  console.log(process.argv);
  process.exit(1);
}

console.log("~~~ INGESTOR ~~~");

var workingDir = __dirname;
console.log("Working dir:", workingDir);

var ingestorConfig = JSON.parse(fs.readFileSync(process.argv[2]));
console.log();
console.log("Config file:");
console.log(prettyjson.render(ingestorConfig));
console.log();
