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
      ") RETURN n LIMIT 5";
    console.log("Group Match:", groupMatch);

    config.datagroup.datasets.forEach(dataset => {
      console.log("Dataset API:", dataset.api);
      match = "MATCH (n: " + config.datagroup.dataGroupLabel +
        ":" + dataset.label + ") RETURN ";
      match += dataset.keys.map(key => "n." + key + " AS " + key).join(", ");
      match += " LIMIT 5";
      console.log("Dataset Match:", match);

      makeGetter(app, config.datagroup.dataGroupAPI + dataset.api, match);
    });

    makeGetter(app, config.datagroup.dataGroupAPI, groupMatch);
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

function makeGetter(app, url, match) {
  app.get(url, (req, res) => {
    console.log("REQUEST:", req.url);
    console.log(">>>USING REQUEST:", match);

    session.run(match)
    .then(result => processNeo(res, result));
  });
}

exec(
  'find ' + dataSources + ' -type f -iname "*-config.js"',
  function(error, stdout, stderr) {
    if (error) {
      console.log("Error:", error);
      process.exit(1);
    }

    stdout.split(/\r?\n/).forEach(processDataSetConfig);

    console.log("Using port:", port);

    // Catcher
    app.get('/*', function(req, res) {
      console.log("Req:", req.url);
      res.send("NOPE");
    });

    app.listen(port, () => {
      console.log("Server started at " + port);
    });
  }
);
