#!/usr/local/bin/node

var fs = require("fs");
var prettyjson = require("prettyjson");

var workingDir = __dirname;
var util = require(workingDir + "/../utils/ingest-util");
var neoUtil;

var args = process.argv.splice(2);

var DONEO = false;

while (args.length && args[0][0] == '-') {
  var flag = args.shift();

  switch (flag) {
    case '-n':
      DONEO = true;
      neoUtil = require(workingDir + "/../utils/neo-util");
      break;

    default:
      console.log("Warning - Unknown option:", args[0]);
  }
}

if (process.argv.length < 2) {
  console.log("Must specify what to ingest");
  console.log(process.argv);
  process.exit(1);
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

if (!ingestorConfig.enabled) {
  console.log("DATASET DISABLED");
  process.exit();
}

var writer = process.stdout;
var outputType = DONEO ? 'json' : 'pp';

var neoUtilDriver;
if (DONEO) {
  neoUtilDriver = neoUtil.new(require('../neo-config.json'));
}

if (ingestorConfig.source) {
  console.log();
  console.log("Data source:", ingestorConfig.source);
  var reader = util.reader(ingestorConfig.source);

  if (DONEO) {
    util.throttle(reader).then(throttled => {
      console.log("HERE");
      var uploader = neoUtilDriver.uploader(throttled, ingestorConfig.id, ingestorConfig.label);
      neoUtil.done();
    });
  }
}

if (ingestorConfig.datasets) {
  console.log();
  console.log("Datasets:", ingestorConfig.datasets);
  ingestorConfig.datasets.forEach(dataset => {
    var reader = util.reader(dataset.source);

    if (DONEO) {
      util.throttle(reader).then(throttled => {
        var uploader = neoUtilDriver.uploader(
          throttled,
          dataset.id ? dataset.id : ingestorConfig.id,
          ...[ingestorConfig.label, dataset.label]
        );
      });
    }
  });
}
