#!/usr/local/bin/node

var fs = require("fs");
var prettyjson = require("prettyjson");

var workingDir = __dirname;
var util = require(workingDir + "/ingest-util");
var neoUtil = require(workingDir + "/neo-util").new('../neo-config.json');

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

if (ingestorConfig.source) {
  var ingestor = util.new(ingestorConfig.source, 'json');

  if (DONEO) {
    writer = neoUtil.uploader(ingestorConfig.label, ingestorConfig.id);
    writer.on('finish', () => {
      neoUtil.done();
    });
  }

  ingestor.pipe(writer);
}

if (ingestorConfig.datasets) {
  for (dataset in ingestorConfig.datasets) {
    var ingestor = util.new(dataset.source, 'json');

    if (DONEO) {
      writer = neoUtil.uploader(
        [ingestorConfig.label, dataset.label],
        dataset.id ? dataset.id : ingestorConfig.id
      );
    }

    ingestor.pipe(writer);
  }
}
