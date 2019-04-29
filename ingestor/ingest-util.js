var http = require('http');
var https = require('https');
var { spawn } = require('child_process');
var { Readable } = require('stream');
var fs = require('fs');
var fileReader = fs.createReadStream;
var prettyjson = require('prettyjson');
var csvStream = require('csv-stream').createStream;
var oboe = require('oboe');
var crypto = require('crypto');


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
exports.reader = {
  new: (source) => {
    var type = source.type;
    var location = source.location;
    var matcher = source.root;
    var stdin, stdout;

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

    if ('file' === sourceType) {
      stdin = fileReader(location)
    }
    else if (('http' === sourceType) || ('https' === sourceType)) {
      var stdin = new Readable({read: () => {}});

      var tmpFile = "tmp.ingestor." + crypto.randomBytes(8).toString("hex");

      var tmpOut = fs.createWriteStream(tmpFile);
      tmpOut.on('finish', () => {
        console.log('Finished writing');
        var tmpIn = fs.createReadStream(tmpFile);
        tmpIn.on('data', data => stdin.push(data));
        tmpIn.on('end', () => stdin.push(null));
      });
      ('https' === sourceType ? https : http).get(location, res => {
        res.pipe(tmpOut);
      });
    }

    if ('csv' === type) {
      stdout = stdin.pipe(csvStream({enclosedChar: '"'}));
    }
    else if ('json' === type) {
      stdout = new Readable({
        read() {}
      });

      oboe(stdin)
      .node(matcher, data => {
        console.log("JSON:", JSON.stringify(data));
        stdout.push(JSON.stringify(data) + "\n");
      })
      .on('done', () => {
        stdout.push(null);
      });
    }

    return stdout;
  }
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
        console.log("Stringified:", JSON.stringify(data).toString());
        output.push(JSON.stringify(data));
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

  return exports.writer.new(readerStream, outputType);
};

exports.processor = {
  new: () => {
    return {};
  }
};
