#!/usr/local/bin/node

var fs = require("fs");
var prettyjson = require("prettyjson");

if (process.argv.length !== 4) {
  console.log("Must specify what to ingest");
  console.log(process.argv);
  process.exit(1);
}

var ingestorConfigKey = process.argv[2];
var ingestorConfigFile = process.argv[3];

console.log("~~~ INGESTOR ~~~");

var workingDir = __dirname;
console.log("Working dir:", workingDir);
var util = require(workingDir + "/ingest-util");

var ingestorConfig = JSON.parse(fs.readFileSync(ingestorConfigFile));
console.log();
console.log("Config key:", ingestorConfigKey);
console.log();
console.log("Config file:");
console.log(prettyjson.render(ingestorConfig));
console.log();

if (!ingestorConfig.source) {
  console.log("No data source o_O");
  process.exit(1);
}

console.log("Data source:", ingestorConfig.source);
util.downloadDataFromSource(ingestorConfig.source);
