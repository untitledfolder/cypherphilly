const Promise = require("promise");
const { spawn } = require('child_process');
const { Readable } = require('stream');
const fs = require('fs');
const prettyjson = require('prettyjson');
const http = require('http');
const https = require('https');
const readline = require('readline');
const crypto = require('crypto');

const csvStream = require('csv-stream').createStream;
const oboe = require('oboe');

const DEBUG = true;


/***   HELPERS   ***/
function itemizeData(input, type, jsonRootMatcher) {
  var output = new Readable({read() {}});

  if ('csv' === type) {
    var fields;
    var csvConverter = input.pipe(csvStream({enclosedChar: '"'}));

    csvConverter.on('data', data => {
      if (DEBUG) {
        console.log("Converted CSV Data:", data);
        console.log();
      }

      output.push(JSON.stringify(data));
    });
    csvConverter.on('end', () => {
      output.push(null);
    });
  }
  else if ('json' === type) {
    oboe(input)
    .node(jsonRootMatcher, data => {
      if (DEBUG) {
        console.log("Converted CSV Data:", data);
        console.log();
      }

      output.push(JSON.stringify(data));
    })
    .on('done', () => {
      output.push(null);
    });
  }

  return output;
}


/***   EXTERNAL   ***/

exports.throttle = (input) => {
  var resolve, reject;
  var done = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  var tmpFileName = "tmp.ingestor." + crypto.randomBytes(8).toString("hex");
  var tmpFile = fs.createWriteStream(tmpFileName);
  var throttledOutput;

  input.on('data', data => {
    tmpFile.write(data + "\n");
  });
  input.on('end', data => {
    tmpFile.end(data);
  });

  tmpFile.on('finish', () => {
    if (DEBUG) {
      console.log("Finished caching; starting throttling");
      console.log();
    }

    throttledOutput = fs.createReadStream(tmpFileName, {
      highWaterMark: 1
    });

    resolve(throttledOutput);
  });

  return done;
}

/**
 * Reader
 *
 *
 * Description:
 *
 * TODO
 *
 *
 * Params:
 *
 *
 */
exports.reader = (source) => {
  var type = source.type;
  var location = source.location;
  var matcher = source.root;
  var input, output;
  var sourceType;

  if (location.match(/^https/)) {
    sourceType = 'https';
  }
  else if (location.match(/^http/)) {
    sourceType = 'http';
  }
  else {
    sourceType = 'file';
  }

  // Open as a ReadStream, whichever way it is retrieved
  if ('file' === sourceType) {
    input = fs.createReadStream(location);
  }
  else if (('http' === sourceType) || ('https' === sourceType)) {
    input = new Readable({read() {}});

    ('https' === sourceType ? https : http).get(location, res => {
      res.on('data', (data) => {
        input.push(data);
      });
      res.on('end', () => {
        input.push(null);
      });
    });
  }

  if (DEBUG) {
    input.on('data', (data) => {
      console.log("Data read:", data.toString());
      console.log();
    });
    input.on('end', () => {
      console.log("~~~ DATA COMPLETE FOR SOURCE:", location,"~~~");
      console.log();
    });
  }

  output = itemizeData(input, type, matcher);

  output.on('data', data => {
    console.log("Itemized Data:", data.toString());
  });
  output.on('end', () => {
    console.log("DONE");
  });

  return output;
}

/**
 * Writer
 *
 *
 * Description:
 *
 * TODO
 *
 *
 * Params:
 *
 *
 */
exports.writer = {
  new: (input, type) => {
    var output = new Readable({
      read() {}
    });

    if ('pp' === type) {
      input.on('data', data => {
        output.push(prettyjson.render(data));
      });
    }
    else if ('json' === type) {
      input.on('data', data => {
        output.push(data.toString());
      });
    }
    else if ('csv' === type) {
      var sentHeader = false;

      input.on('data', data => {
        if (!sentHeader) {
          sentHeader = true;
          output.push('"' + Object.keys(data).join('","') + '"');
        }

        output.push('"' + Object.values(data).join('","') + '"');
      });
    }

    input.on('end', () => {
      output.push(null);
    });

    return output;
  }
};


/**
 * Ingestor Manager
 *
 * TODO Description
 */
exports.new = (source, outputType) => {
  var readerStream = exports.reader.new(source);

  var ingestor = exports.writer.new(readerStream, outputType);
  ingestor.pause = () => {
    readerStream.pause();
  };
  ingestor.resume = () => {
    readerStream.resume();
  };

  return ingestor;
};

exports.processor = {
  new: () => {
    return {};
  }
};
