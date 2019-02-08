#!/usr/local/bin/node

var fs = require("fs");
var prettyjson = require("prettyjson");

if (process.argv.length !== 4) {
  console.log("Must specify what to ingest");
  console.log(process.argv);
  process.exit(1);
}

var dataConfigKey = process.argv[2];
var dataConfigFile = process.argv[3];

console.log("~~~ INGESTOR ~~~");

var workingDir = __dirname;
console.log("Working dir:", workingDir);

var ingestorConfig = JSON.parse(fs.readFileSync(dataConfigFile));
console.log();
console.log("Config key:", dataConfigKey);
console.log();
console.log("Config file:");
console.log(prettyjson.render(ingestorConfig));
console.log();
