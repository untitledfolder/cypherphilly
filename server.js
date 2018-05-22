var neoConfig = require('./config');
var neo4j = require('neo4j-driver').v1;
var exec = require('child_process').exec;
var app = require('express')();

var dataSources = "./scrapers";

console.log("Neo Config:", neoConfig);
var driver = neo4j.driver(neoConfig.connect, neo4j.auth.basic(neoConfig.neoUser, neoConfig.neoPW));
var session = driver.session();

var port = 3000;

if (process.argv.length >= 3) {
  port = process.argv[2];
}

if (process.argv.length >= 4) {
  dataSources = process.argv[3];
}

function processDataSetConfig(dataConfig) {
  if (dataConfig.length) {
    var config = require(dataConfig);

    console.log("Group API:", config.datagroup.dataGroupAPI);
    var groupMatch = "MATCH (n: " + config.datagroup.dataGroupLabel +
      ") RETURN n";
    console.log("Group Match:", groupMatch);

    app.get(config.datagroup.dataGroupAPI, (req, res) => {
      session.run(groupMatch)
      .then(result => processNeo(res, result));
    });

    config.datagroup.datasets.forEach(dataset => {
      console.log("Dataset API:", dataset.api);
      match = "MATCH (n: " + config.datagroup.dataGroupLabel +
        ":" + dataset.label + ") RETURN n";
      console.log("Dataset Match:", match);

      app.get(
        config.datagroup.dataGroupAPI + dataset.api,
        (req, res) => {
          console.log("REQUEST:", req.url);
          session.run(Match)
          .then(result => processNeo(res, result));
        }
      );
    });
  }
}

function processNeo(res, result) {
  //TODO: Make this a utility for all Neo4j responses
  res.send(
    result.records.map(
      i => i.keys.reduce(
        (dataObject, key, j) => {
          dataObject[key] = i._fields[j];
          return dataObject;
        },
        {}
      )
    )
  );
}

exec(
  'find ' + dataSources + ' -type f -iname "*-config.js"',
  function(error, stdout, stderr) {
    if (error) {
      console.log("Error:", error);
      process.exit(1);
    }

    stdout.split(/\r?\n/).forEach(processDataSetConfig);
  }
);

app.get('/*', function(req, res) {
  console.log("Req:", req.url);
  res.send("NOPE");
});

console.log("Using port:", port);
app.listen(port, () => {
  console.log("Server started at " + port);
});
