#!/usr/bin/env node

var exec = require('child_process').exec;
var test = false;
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

console.log("Starting Scrapers");
exec(
  'find ' + dataSources + ' -type f -iname "*-config.js"',
  function(error, stdout, stderr) {
    if (error) {
      console.log("Error:", error);
      process.exit(1);
    }

    stdout.split(/\r?\n/).forEach(function(dataConfig) {
      if (dataConfig.length) {
        console.log("Data Config:", dataConfig);
        var config = require('../' + dataConfig);
        console.log("\tData Group Name:", config.datagroup.dataGroupName);
        config.datagroup.datasets.forEach(function (dataset) {
          console.log("\t\tData Set Name:", dataset.name);
        });
      }
    });
  }
);
