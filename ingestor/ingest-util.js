var http = require('http');
var { spawn } = require('child_process');
var { Readable } = require('stream');
var fileReader = require('fs').createReadStream;
var prettyjson = require('prettyjson');
var csvStream = require('csv-stream').createStream;
var oboe = require('oboe');

exports.downloadDataFromSource = function(source) {
  console.log("Download data from:", source);

  return spawn('curl ' + source, {
    shell: true
  });
};

exports.prettyjson = function(stdin, stdout) {
  var pretty = "";

  process.stdout.write("Getting data...");
  stdin.on('data', (data) => {
    process.stdout.write(".");
    pretty += data;
  });

  stdin.on('close', () => {
    console.log();
    console.log("Done!");
    stdout.write(prettyjson.render(JSON.parse(pretty)));
    console.log();
  });
};

var reader = {
  new: (type, source, matcher) => {
    var sourceType = source.match(/^http/) ? 'http' : 'file';
    var stdin, stdout;

    if ('file' === sourceType) {
      stdin = fileReader(source)
    }
    else if ('http' === sourceType) {
      stdin = http.get(source);
    }

    if ('csv' === type) {
      stdout = stdin.pipe(csvStream({enclosedChar: '"'}));
    }
    else if ('json' === type) {
      stdout = new Readable({
        objectMode: true,
        read() {}
      });

      oboe(stdin)
      .node(matcher, data => {
        stdout.push(data);
      })
      .on('done', () => {
        stdout.push(null);
      });
    }

    return stdout;
  }
}

exports.new = (type, source) => {
};

exports.reader = reader;

exports.processor = {
  new: () => {
    return {};
  }
};

exports.writer = {
  new: () => {
    return {};
  }
};
