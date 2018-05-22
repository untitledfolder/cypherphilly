#!/usr/bin/env node

var config = require('./config');
var neo4j = require('neo4j-driver').v1;

var driver = neo4j.driver(config.connect, neo4j.auth.basic(config.neoUser, config.neoPW));
var session = driver.session();

var stillReading = true;
var processingCount = 0;

function updateEdges() {
  processingCount++;
  session.run(
    'MATCH (c: PoliceComplaint:PoliceComplaintData), (f: PoliceComplaint:PoliceComplaintFinding)\n' +
    'WHERE c.cartodb_id = f.cartodb_id\n' +
    'CREATE (c)-[:finding]->(f)' +
    'RETURN c'
  )
  .then(result => {
    console.log("Match Count:",result.records.length);
    if (result.records.length) {
      console.log("RESULTS:", result.records);
    }
    else {
      console.log("No updates");
    }
  })
  .then(() => {
    finish();
  })
  .catch((err) => {
    console.log("CRASHING:", err);
    session.close();
    driver.close();
  });
}

function finish() {
  console.log("Done.");
  session.close();
  driver.close();
}

updateEdges();
