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
  neo4j.auth.basic(neoConfig.user, neoConfig.password)
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

console.log("Enabled Datasets:");
var apiList = [];
enabledDatasets.forEach(dataset => {
  console.log(dataset.key);
  apiList.push({
    url: `/data/${dataset.key}`,
    name: dataset.config.name,
    labels: [dataset.config.label],
    cypher: cypherUtil.genGetAll([dataset.config.label], 1000)
  });

  if (dataset.config.datasets) {
    dataset.config.datasets.forEach(subdataset => {
      console.log(' ', subdataset.key);
      apiList.push({
        url: `/data/${dataset.key}/${subdataset.key}`,
        name: `${dataset.config.name} - ${subdataset.name}`,
        labels: [dataset.config.label, subdataset.label],
        cypher: cypherUtil.genGetAll([dataset.config.label, subdataset.label], 1000)
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
      responseStream.push('[');
      responseStream.pipe(res);
      neoSession.run(apiConfig.cypher)
      .subscribe({
        onNext: record => {
          responseStream.push(
            JSON.stringify(record) + '\n'
          );
        },
        onCompleted: () => {
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

//process.exit();

app.listen(port, () => {
  console.log("Server started:", port);
});
