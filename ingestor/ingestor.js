const fs = require('fs');
const { IngestManager } = require("../utils/ingestmanager");
const { NeoUploader } = require("./neoUploader");
const { SqlUploader } = require("./sqlUploader");
const { UploadManager } = require("./uploader");

const neo4j = require("neo4j-driver").v1;
const neoConfig = require("../neo-config");
const sqlConfig = require("../sql-config");
const workingDir = __dirname;

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: sqlConfig.host,
    user: sqlConfig.user,
    password: sqlConfig.password,
    database: sqlConfig.database
  }
});

function resolveAll(list) {
  let item = list.shift();

  if (list.length) {
    return item.then(() => {
      console.log("Ingestor done");

      return resolveAll(list)
    });
  }

  console.log("WAITING");
  return item;
}

var args = process.argv.splice(2);

var UPLOAD_SQL = false;
var UPLOAD_NEO = false;
var DEBUG = false;

while (args.length && args[0][0] == '-') {
  var flag = args.shift();

  switch (flag) {
    case '-u':
      var uploadType = args.shift();
      if (uploadType === "sql") {
        UPLOAD_SQL = true;
      }
      else if (uploadType == "neo") {
        UPLOAD_NEO = true;
      }
      else {
        console.log("Unknown upload type:", uploadType);
      }
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
if (UPLOAD_NEO) {
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

  let manager = new IngestManager(ingestorConfig.source);
  let ingestStream = manager.start();
  var uploader;

  if (UPLOAD_SQL) {
    console.log("Uploading to MariaDB:", ingestorConfigKey);

    uploader = new SqlUploader(
      ingestorConfig.name + " SQL",
      knex,
      sqlConfig.max_uploads,
      ingestorConfig.id,
      ingestorConfig.table,
      ingestorConfig.fields
    );
  }
  else if (UPLOAD_NEO) {
    console.log("Uploading to Neo4j:", ingestorConfigKey);

    uploader = new NeoUploader(
      ingestorConfig.name + " Neo",
      neoDriver,
      neoConfig.max_uploads,
      ingestorConfig.id,
      ingestorConfig.label
    );
  }
  else {
    return Promise.resolve(ingestStream.pipe(process.stdout));
  }

  var uploadManager = new UploadManager(
    ingestorConfig.name + " UploadManager",
    ingestStream,
    uploader
  );

  uploadManager.init().then(() => {
    return uploadManager.uploadData();
  })
  .catch(err => {
    console.log("ERRR:", err);
  })
  .done(() => {
    console.log("INGESTOR: Done Uploading");
    if (neoDriver) {
      console.log("Closing Neo");
      neoDriver.close();
    }
    if (knex) {
      console.log("Closing SQL");
      knex.destroy();
    }

    console.log("DONE!");
  });
}

if (ingestorConfig.datasets) {
  if (DEBUG) {
    console.log();
    console.log("Datasets:", ingestorConfig.datasets);
  }

  var uploaderPromises = ingestorConfig.datasets.map(dataset => {
    //var dataFilename = workingDir + '/../datasets/data.' + ingestorConfigKey + '.' + dataset.key + '.flat';

    var manager = new IngestManager(dataset.source);

    var ingestStream = manager.start();
    var uploader;

    if (UPLOAD_SQL) {
      console.log("Uploading to MariaDB:", ingestorConfigKey, dataset.key);

      uploader = new SqlUploader(
        dataset.name + " SQL",
        knex, sqlConfig.max_uploads,
        dataset.id ? dataset.id : ingestorConfig.id,
        ingestorConfig.table ?
        ingestorConfig.table + dataset.table : dataset.table,
        dataset.fields
      );
    }
    else if (UPLOAD_NEO) {
      console.log("Uploading to Neo4j:", ingestorConfigKey, dataset.key);

      uploader = new NeoUploader(
        dataset.name + " Neo",
        neoDriver,
        neoConfig.max_uploader,
        dataset.id ? dataset.id : ingestorConfig.id,
        ingestorConfig.label, dataset.label
      );
    }
    else {
      return Promise.resolve(ingestStream.pipe(process.stdout));
    }

    var uploadManager = new UploadManager(
      `${ingestorConfig.name} ${dataset.name} Upload Manager`,
      ingestStream,
      uploader
    );

    return uploadManager.init().then(() => {
      return uploadManager.uploadData();
    });
  });


  resolveAll(uploaderPromises)
  .then(() => {
    console.log("DONE!");
    if (neoDriver) {
      console.log("Closing Neo");
      neoDriver.close();
    }
    if (knex) {
      console.log("Closing SQL");
      knex.destroy();
    }
  })
  .catch(err => {
    console.log("ERRR:", err);
  });
}
