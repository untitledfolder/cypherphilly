#!/usr/local/bin/node

var fs = require("fs");
var prettyjson = require("prettyjson");

var workingDir = __dirname;
var util = require(workingDir + "/ingest-util");

if (process.argv.length < 4) {
  console.log("Must specify what to ingest");
  console.log(process.argv);
  process.exit(1);
}

var ingestorConfigKey = process.argv[2];
var ingestorConfigFile = process.argv[3];

console.log("~~~ INGESTOR ~~~");

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

if (ingestorConfig.source) {
  var ingestor = util.new(ingestorConfig.source, 'pp')
  ingestor.pipe(process.stdout);
}

if (ingestorConfig.datasets) {
  for (dataset in ingestorConfig.datasets) {
    var ingestor = util.new(dataset.source, 'pp')
    ingestor.pipe(process.stdout);
  }
}
