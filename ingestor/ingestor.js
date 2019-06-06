const fs = require("fs");
const prettyjson = require("prettyjson");

const util = require("../utils/ingest-util");
const neo4j = require("neo4j-driver").v1;
const neoConfig = require("../neo-config");
const { NeoUploader } = require("./neoUploader");
const { UploadManager } = require("./uploader");
const workingDir = __dirname;

var args = process.argv.splice(2);

var DO_UPLOAD = false;
var DEBUG = true;

while (args.length && args[0][0] == '-') {
  var flag = args.shift();

  switch (flag) {
    case '-u':
      DO_UPLOAD = true;
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
  console.log(prettyjson.render(ingestorConfig.name));
}
else {
  console.log("Ingesting:", ingestorConfigKey);
}

if (!ingestorConfig.enabled) {
  console.log("DATASET DISABLED");
  process.exit();
}

var neoDriver;
if (DO_UPLOAD) {
  neoDriver = neo4j.driver(
    neoConfig.host,
    neo4j.auth.basic(neoConfig.user, neoConfig.password),
    { disableLosslessIntegers: true }
  );
}

if (ingestorConfig.source) {
  var dataFilename = workingDir + '/../datasets/data.' + ingestorConfigKey + '.flat';

  if (DEBUG) {
    console.log();
    console.log("Data source:", ingestorConfig.source);
    console.log("Data Storage File:", dataFilename);
  }

  util.new(ingestorConfig.source, dataFilename, DEBUG)
  .then(ingestStream => {
    var uploader;

    if (DO_UPLOAD) {
      console.log("Uploading to neo:", ingestorConfigKey);

      uploader = new NeoUploader(
        neoDriver,
        neoConfig.max_uploads,
        ingestorConfig.id,
        ingestorConfig.label
      );
    }
    else {
      return ingestStream.pipe(process.stdout)
    }

    var uploadManager = new UploadManager(
      ingestStream, uploader
    );

    return uploadManager.init().then(() => {
      return uploadManager.uploadData();
    });
  })
  .catch(err => {
    console.log("ERRR:", err);
  })
  .done(() => {
    if (neoDriver) {
      neoDriver.close();
    }
    console.log("DONE!");
  });
}

if (ingestorConfig.datasets) {
  if (DEBUG) {
    console.log();
    console.log("Datasets:", ingestorConfig.datasets);
  }

  var ingestorPromises = ingestorConfig.datasets.map(dataset => {
    var dataFilename = workingDir + '/../datasets/data.' + ingestorConfigKey + '.' + dataset.key + '.flat';

    return util.new(dataset.source, dataFilename, DEBUG)
    .then(ingestStream => {
      var uploader;

      if (DO_UPLOAD) {
        console.log("Uploading to neo:", ingestorConfigKey, dataset.key);

        uploader = new NeoUploader(neoDriver, neoConfig.max_uploads,
          dataset.id ? dataset.id : ingestorConfig.id,
          ingestorConfig.label, dataset.label
        );
      }
      else {
        return ingestStream.pipe(process.stdout)
      }

      var uploadManager = new UploadManager(
        ingestStream, uploader
      );

      return uploadManager.init().then(() => {
        return uploadManager.uploadData();
      });
    });
  });

  Promise.all(ingestorPromises)
  .then(result => {
    console.log("DONE!");
    if (neoDriver) {
      neoDriver.close();
    }

    return result;
  })
  .catch(err => {
    console.log("ERRR:", err);
  });
}
