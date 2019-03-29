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
    var io;

    if ('file' === sourceType) {
      if ('csv' === type) {
        io = fileReader(source)
        .pipe(csvStream({enclosedChar: '"'}));
      }
      else if ('json' === type) {
        io = new Readable({
          objectMode: true,
          read() {}
        });

        oboe(fileReader(source))
        .node(matcher, data => {
          io.push(data);
        })
        .on('done', () => {
          io.push(null);
        });
      }
    }

    return io;
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
