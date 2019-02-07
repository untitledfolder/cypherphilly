#!/usr/local/bin/node

if (process.argv.length !== 3) {
  console.log("Must specify what to ingest");
  console.log(process.argv);
  process.exit(1);
}

console.log("~~~ INGESTOR ~~~");

var workingDir = __dirname;
console.log("Working dir:", workingDir);

var ingestorConfig = process.argv[2];
console.log("Config file:", ingestorConfig);
