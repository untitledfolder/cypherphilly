#!/usr/bin/env node

var exec = require('child_process').exec;
var test = true;
var help = false;
var dataSources = "./scrapers";
var args = Object.assign([], process.argv);
args.shift();
args.shift();

while (args.length) {
  console.log("Arg:", args[0]);
  var arg = args.shift();

  if (args.length) {
    if ("-s" == arg) {
      dataSources = args.shift();
      continue;
    }
  }

  if ("-t" == arg) test = true;
  else if ("-h" === arg) help = true;
  else console.log("Don't know arg:", arg);
}

console.log("Help:", help);
console.log("Test:", test);
console.log("Sources:", dataSources);

function processDataSetConfig(dataConfig) {
  if (dataConfig.length) {
    console.log("Data Config:", dataConfig);
    // TODO: Only do if it doesn't start with one of these: ['./', '../', '/']
    var config = require('../' + dataConfig);

    console.log("\tData Group Name:", config.datagroup.dataGroupName);
    config.datagroup.datasets.forEach(function (dataset) {
      console.log("\t\tData Set Name:", dataset.name);
      var getDataCommand;
      if (test && dataset.test && dataset.test.file) {
        console.log("\t\tTest Data:", dataset.test.file);
        getDataCommand = "cat " + dataset.test.file;
      }
      else if (!test) {
        console.log("\t\tSource:", dataset.source);
        getDataCommand = "wget " + dataset.source;
      }
      else {
        console.log("\t\tNo tests");
        return;
      }

      processDataSet(getDataCommand, dataset.processor);
    });
  }
}

function processDataSet(getDataCommand, processDataScript) {
  exec(
    getDataCommand + ' | ' + processDataScript,
    function(error, stdout, stderr) {
      if (error) {
        console.log("Error:", error);
      }

      process.stdout.write(stdout);
    }
  );
}

console.log("Starting Scrapers");
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
