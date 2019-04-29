#!/usr/local/bin/node

var fs = require("fs");
var prettyjson = require("prettyjson");

var workingDir = __dirname;
var util = require(workingDir + "/ingest-util");
var neoUtil = require(workingDir + "/neo-util").new(require('../neo-config.json'));

var args = process.argv.splice(2);

if (process.argv.length < 2) {
  console.log("Must specify what to ingest");
  console.log(process.argv);
  process.exit(1);
}

var DONEO = false;

if (args.length >= 3 && args[0] === '-n') {
  DONEO = true;
  args.shift();
}

var ingestorConfigKey = args[0];
var ingestorConfigFile = args[1];

var ingestorConfig = JSON.parse(fs.readFileSync(ingestorConfigFile));

console.log("~~~ INGESTOR ~~~");
console.log();
console.log("Config key:", ingestorConfigKey);
console.log();
console.log("Config file:");
console.log(prettyjson.render(ingestorConfig));
console.log();
console.log("Data source:", ingestorConfig.source);

var writer = process.stdout;
var outputType = DONEO ? 'json' : 'pp';

if (ingestorConfig.source) {
  var ingestor = util.new(ingestorConfig.source, outputType);

  if (DONEO) {
    writer = neoUtil.uploader(ingestor, ingestorConfig.id, ingestorConfig.label);
    neoUtil.done();
  }
}

if (ingestorConfig.datasets) {
  for (dataset in ingestorConfig.datasets) {
    var ingestor = util.new(dataset.source, outputType);

    if (DONEO) {
      writer = neoUtil.uploader(
        ingestor,
        dataset.id ? dataset.id : ingestorConfig.id,
        ...[ingestorConfig.label, dataset.label]
      );
    }
  }
}
