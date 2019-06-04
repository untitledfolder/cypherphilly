#!/usr/local/bin/node

var fs = require("fs");
var prettyjson = require("prettyjson");

var workingDir = __dirname;
var util = require(workingDir + "/../utils/ingest-util");
var neoUtil = require(workingDir + "/../utils/neo-util");
var neoManager;

var args = process.argv.splice(2);

var DONEO = false;
var DEBUG = true;

while (args.length && args[0][0] == '-') {
  var flag = args.shift();

  switch (flag) {
    case '-n':
      DONEO = true;
      neoManager = neoUtil.new(require('../neo-config.json'), DEBUG);
      break;

    case '-d':
      DEBUG = true;
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

if (DEBUG) {
  console.log("~~~ INGESTOR ~~~");
  console.log();
  console.log("Config key:", ingestorConfigKey);
  console.log();
  console.log("Config file:");
  console.log(prettyjson.render(ingestorConfig));
}
else {
  console.log("Ingesting:", ingestorConfigKey);
}

if (!ingestorConfig.enabled) {
  console.log("DATASET DISABLED");
  process.exit();
}

if (ingestorConfig.source) {
  var tmpFilename = 'tmp.' + ingestorConfigKey + '.flat';

  if (DEBUG) {
    console.log();
    console.log("Data source:", ingestorConfig.source);
    console.log("Tmp File:", tmpFilename);
  }

  util.new(ingestorConfig.source, tmpFilename, DEBUG)
  .then(ingestStream => {
    if (DONEO) {
      console.log("Uploading to neo");
      return neoManager.newUploader(
        ingestStream,
        ingestorConfig.id,
        ingestorConfig.label
      ).then(result => {
        neoManager.close();
        return result;
      });
    }

    return ingestStream.pipe(process.stdout);
  })
  .then(results => {
    //console.log("Deleting complete tmp file:", tmpFilename);
    //fs.unlinkSync(tmpFilename);
    return results;
  })
  .catch(err => {
    console.log("ERRR:", err);
  })
  .done(() => {
    console.log("DONE!");
  });
}

if (ingestorConfig.datasets) {
  if (DEBUG) {
    console.log();
    console.log("Datasets:", ingestorConfig.datasets);
  }
  var ingestorPromises = ingestorConfig.datasets.map(dataset => {
    var tmpFilename = 'tmp.' + ingestorConfigKey + '.' + dataset.key + '.flat';
    return util.new(dataset.source, tmpFilename, DEBUG)
    .then(ingestStream => {
      if (DONEO) {
        console.log("Uploading to neo:", ingestorConfigKey, dataset.key);
        return neoManager.newUploader(
          ingestStream,
          dataset.id ? dataset.id : ingestorConfig.id,
          ingestorConfig.label,
          dataset.label
        );
      }

      return ingestStream.pipe(process.stdout);
    })
    .then(results => {
      //console.log("Deleting complete tmp file:", tmpFilename);
      //fs.unlinkSync(tmpFilename);
      return results;
    })
  });

  Promise.all(ingestorPromises)
  .then(result => {
    console.log("DONE!");
    if (neoManager) {
      neoManager.close();
    }

    return result;
  })
  .catch(err => {
    console.log("ERRR:", err);
  });
}
