const fs = require('fs');
const { Readable, Transform } = require('stream');
const Promise = require("promise");

const http = require('http');
const https = require('https');

const csvStream = require('csv-stream').createStream;
const oboe = require('oboe');


/***   HELPERS   ***/
function fileToStream(filename) {
  console.log("Open file:", filename);
  return fs.createReadStream(filename);
}

function sLowMemoryFileToStream(filename) {
  console.log("Open slow file:", filename);
  return fs.createReadStream(filename, {
    highWaterMark: 1
  });
}

function httpToStream(url) {
  var output = new Readable({read() {}});

  console.log("HTTP:", url);
  (url.match(/^https/) ? https : http)
    .get(url, res => {
      res.on('data', data => output.push(data));
      res.on('end', () => output.push(null));
    })
    .on('error', err => console.log(err));

  return output;
}

function csvToObjectStream(input) {
  console.log("CSV");
  return input.pipe(csvStream({enclosedChar: '"'}));
}

function jsonToObjectStream(input, root) {
  var output = new Readable({objectMode: true, read() {}});

  console.log("JSON:", root);
  oboe(input)
  .node(root, data => output.push(data))
  .on('done', () => output.push(null));

  return output;
}


/***   EXPORTS   ***/

/**
 * Flattener
 */
exports.flattener = (input) => {
  return input.pipe(new Transform({
    writableObjectMode: true,
    transform(data, _, done) {
      done(null, JSON.stringify(data) + '\n');
    }
  }));
}

/**
 * CacheToStream
 */
exports.cacheToSLowMemoryStream = (tmpFilename, input) => {
  var resolve, reject;
  var done = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  var tmpFile = fs.createWriteStream(tmpFilename);
  input.pipe(tmpFile);

  tmpFile.on('finish', () => {
    resolve(sLowMemoryFileToStream(tmpFilename));
  });

  return done;
}

/**
 * Reader
 */
exports.reader = (source) => {
  var input = source.location.match(/^https?/) ?
    httpToStream(source.location) :
    fileToStream(source.location);

  return source.type === 'csv' ?
    csvToObjectStream(input) :
    jsonToObjectStream(input, source.root);
}

/**
 * Ingest Manager
 */
exports.new = (name, source, tmpFilename, debug) => {
  if (fs.existsSync(tmpFilename)) {
    console.log(name + ": Continuing where we left off!");

    return Promise.resolve(sLowMemoryFileToStream(tmpFilename));
  }

  var reader = exports.reader(source);
  var flattener = exports.flattener(reader);

  if (debug) {
    reader.on('data', data => console.log(name + ': INGESTOR - READ', data));
    flattener.on('data', data => console.log(name + ': FLATTENER - READ', data.toString()));
  }

  return exports.cacheToSLowMemoryStream(tmpFilename, flattener);
}
