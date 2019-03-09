#!/usr/bin/env node

var app = require('express')();
var serveStatic = require('serve-static');

var args = process.argv.splice(2);
var port = 3000;

if (args.length) {
  port = args.shift();
}

console.log("Starting server at port `" + port + "`....");
app.use('/content', serveStatic('content'));
app.use(
  serveStatic('dist', {
    'index': ['index.html']
  })
);
app.listen(port);
