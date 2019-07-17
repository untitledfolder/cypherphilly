const fs = require('fs');
const app = require('express')();
const datasetsRoot = __dirname + '/../datasets';
const cypherUtil = require('../utils/cypher-util');
const sqlConfig = require("../sql-config");
const { Readable } = require('stream');


/**
 * Configs
 */
var port = 7000;
var limit = 10;

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


/**
 * Helpers
 */
function getDatasets(datasetFiles, enabled) {
  var returnDatasets = [];

  returnDatasets = datasetFiles
  .filter(datasetFile => datasetFile.match(/^[A-Za-z_]+\.json$/))
  .map(datasetFile => {
    var datasetKey = datasetFile.replace(/\.json$/, '');
    var datasetConfig = require(datasetsRoot + '/' + datasetFile);

    console.log("Dataset:", datasetKey);
    console.log(datasetConfig.name);
    console.log("Enables?:", datasetConfig.enabled);
    console.log();
    return {
      key: datasetKey,
      config: datasetConfig
    };
  });

  if (enabled) {
    returnDatasets = returnDatasets.filter(dataset => dataset.config.enabled);
  }

  return returnDatasets;
};

function makeAPIConfigList(datasets) {
  var apiConfigList = [];

  datasets.forEach(dataset => {
    if (dataset.config.datasets) {
      dataset.config.datasets.forEach(subdataset => {
        apiConfigList.push({
          url: `/api/data/${dataset.key}/${subdataset.key}`,
          name: `${dataset.config.name} - ${subdataset.name}`,
          labels: [dataset.config.label, subdataset.label],
          cypher: cypherUtil.genGetAll([dataset.config.label, subdataset.label], limit),
          table: subdataset.table
        });
      });
    }
    else {
      apiConfigList.push({
        url: `/api/data/${dataset.key}`,
        name: dataset.config.name,
        labels: [dataset.config.label],
        cypher: cypherUtil.genGetAll([dataset.config.label], limit),
        table: dataset.config.table
      });
    }
  });

  return apiConfigList;
};

function addApiDetailsListItemLink(contentStream, apiListItem) {
  contentStream.push(`<br><a href="${apiListItem.url}">${apiListItem.name}</a>\n`);
};


/**
 * API Builders
 */
function generateAPIs(app, apiConfigs) {
  apiConfigs.forEach(apiConfig => {
    app.get(apiConfig.url, (req, res, next) => {
      var responseStream = new Readable({read() {}});

      // Sure, why not..
      responseStream.pipe(res);
      responseStream.push('[');
      var skippedFirstComma = false;

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

function generateAPIListPage(app, apiList) {
  app.get('/api/data', (req, res) => {
    let apiContentStream = new Readable({read() {}});
    res.set('Content-Type', 'text/html');
    apiContentStream.pipe(res);

    apiContentStream.push("<html><head><title>CypherPhilly: API List and Details</title></head>\n");
    apiContentStream.push("<body>\n");
    apiContentStream.push("<h1>API LIST<h1>\n");

    apiList.forEach(
      apiListItem => addApiDetailsListItemLink(apiContentStream, apiListItem)
    );

    apiContentStream.push("</body></html>");
    apiContentStream.push(null);
  });
}

var datasetFiles = fs.readdirSync(datasetsRoot);
var enabledDatasets = getDatasets(datasetFiles, true);
var apiConfigList = makeAPIConfigList(enabledDatasets);

generateAPIs(app, apiConfigList);
generateAPIListPage(app, apiConfigList);

app.listen(port, () => {
  console.log("Server started:", port);
});
