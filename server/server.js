const fs = require('fs');
const app = require('express')();
const datasetsRoot = '../datasets';
const cypherUtil = require('../utils/cypher-util');
const neo4j = require("neo4j-driver").v1;
const neoConfig = require("../neo-config.json");
const { Readable } = require('stream');

var port = 7000;
var neoDriver = neo4j.driver(
  neoConfig.host,
  neo4j.auth.basic(neoConfig.user, neoConfig.password),
  { disableLosslessIntegers: true }
);
var neoSession = neoDriver.session();

var args = process.argv.slice(2);
if (args.length) {
  port = args.shift();
}

var datasetFiles = fs.readdirSync(datasetsRoot);
var enabledDatasets = [];

datasetFiles.forEach(datasetFile => {
  if (!datasetFile.match(/^[A-Za-z_]+\.json$/)) return;

  var datasetKey = datasetFile.replace(/\.json$/, '');
  var datasetConfig = require(datasetsRoot + '/' + datasetFile);

  console.log("Dataset:", datasetKey);
  console.log(datasetConfig.name);
  console.log("Enables?:", datasetConfig.enabled);
  console.log();
  if (datasetConfig.enabled) {
    enabledDatasets.push({
      key: datasetKey,
      config: datasetConfig
    });;
  }
});

var limit = 10;
console.log("Enabled Datasets:");
var apiList = [];
enabledDatasets.forEach(dataset => {
  console.log(dataset.key);
  apiList.push({
    url: `/data/${dataset.key}`,
    name: dataset.config.name,
    labels: [dataset.config.label],
    cypher: cypherUtil.genGetAll([dataset.config.label], limit)
  });

  if (dataset.config.datasets) {
    dataset.config.datasets.forEach(subdataset => {
      console.log(' ', subdataset.key);
      apiList.push({
        url: `/data/${dataset.key}/${subdataset.key}`,
        name: `${dataset.config.name} - ${subdataset.name}`,
        labels: [dataset.config.label, subdataset.label],
        cypher: cypherUtil.genGetAll([dataset.config.label, subdataset.label], limit)
      });
    });
  }
});

generateAPIs(app, apiList);

app.get('/data', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.send(generateAPIContentsView(apiList));
});

function generateAPIs(app, apiConfigs) {
  apiConfigs.forEach(apiConfig => {
    app.get(apiConfig.url, (req, res, next) => {
      var responseStream = new Readable({read() {}});

      // Sure, why not..
      responseStream.pipe(res);
      responseStream.push('[');
      var skippedFirstComma = false;

      neoSession.run(apiConfig.cypher)
      .subscribe({
        onNext: record => {
          if (skippedFirstComma) responseStream.push(',\n');
          else skippedFirstComma = true;

          responseStream.push(
            JSON.stringify(cypherUtil.processNode(record))
          );
        },
        onCompleted: () => {
          responseStream.push(']');
          responseStream.push(null);
        },
        onError:  err => {
          next(err);
        }
      });
    });
  });
}

function generateAPIContentsView(apiList) {
  var returnView = "APIs:\n";

  apiList.forEach(apiItem => {
    returnView += `<br><a href="/api${apiItem.url}">${apiItem.name}</a>\n`;
  });

  console.log(returnView);
  return returnView;
}

app.listen(port, () => {
  console.log("Server started:", port);
});
