#!/usr/bin/env node

var readline = require('readline');
var neo4j = require('neo4j-driver').v1;

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', processLine);

function processLine(line) {
  setTimeout(function () {
    console.log(line);
  }, Math.floor(Math.random() * 2000));
}
