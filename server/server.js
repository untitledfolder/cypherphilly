const fs = require('fs');
const app = require('express')();
const datasetsRoot = '../datasets';
const cypherUtil = require('../utils/cypher-util');
const neo4j = require("neo4j-driver").v1;
const neoConfig = require("../neo-config.json");
const sqlConfig = require("../sql-config");
const { Readable } = require('stream');
var port = 7000;
/*
var neoDriver = neo4j.driver(
  neoConfig.host,
  neo4j.auth.basic(neoConfig.user, neoConfig.password),
  { disableLosslessIntegers: true }
);
var neoSession = neoDriver.session();
*/

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: sqlConfig.host,
    user: sqlConfig.user,
    password: sqlConfig.password,
    database: sqlConfig.database
  }
});

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

  if (dataset.config.datasets) {
    dataset.config.datasets.forEach(subdataset => {
      console.log(' ', subdataset.key);
      apiList.push({
        url: `/api/data/${dataset.key}/${subdataset.key}`,
        name: `${dataset.config.name} - ${subdataset.name}`,
        labels: [dataset.config.label, subdataset.label],
        cypher: cypherUtil.genGetAll([dataset.config.label, subdataset.label], limit),
        table: subdataset.table
      });
    });
  }
  else {
    apiList.push({
      url: `/api/data/${dataset.key}`,
      name: dataset.config.name,
      labels: [dataset.config.label],
      cypher: cypherUtil.genGetAll([dataset.config.label], limit),
      table: dataset.config.table
    });
  }
});

generateAPIs(app, apiList);

app.get('/api/data', (req, res) => {
  let apiContentStream = new Readable({read() {}});
  res.set('Content-Type', 'text/html');
  apiContentStream.pipe(res);

  apiContentStream.push("<html><head><title>CypherPhilly: API List and Details</title></head>");
  apiContentStream.push("<body>");
  apiContentStream.push("<h1>API LIST<h1>");
});

function addApiDetailsToContent(contentStream, apiList) {
  if (!apiList.length) {
    contentStream.push("</body>");
    contentStream.push(null);
  }

  let apiItem = apiList.shift();
  contentStream.push(`<br><a href="${apiItem.url}">${apiItem.name}</a>`);
  knex(apiItem.table).count('*').then(count => {
    contentStream.push(`<br><p>Total: ${count}</p>`);
    contentStream.push(`<br>
    contentStream

    return 
}

function generateAPIs(app, apiConfigs) {
  apiConfigs.forEach(apiConfig => {
    app.get(apiConfig.url, (req, res, next) => {
      var responseStream = new Readable({read() {}});

      // Sure, why not..
      responseStream.pipe(res);
      responseStream.push('[');
      var skippedFirstComma = false;

      /*
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
      */
      knex.select().from(apiConfig.table).limit(limit)
      .stream(stream => {
        stream.on('data', data => {
          console.log("Data:", data);
          if (skippedFirstComma) responseStream.push(',\n');
          else skippedFirstComma = true;

          responseStream.push(JSON.stringify(data));
        });
        stream.on('end', () => {
          responseStream.push(']');
          responseStream.push(null);
        });
      }).then(() => {
        console.log('done');
      }).catch(
        err => console.log(`Error reading data from ${apiConfig.table}: ${err}`)
      );
    });
  });
}

app.listen(port, () => {
  console.log("Server started:", port);
});
