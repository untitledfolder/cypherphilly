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

var writer = {
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

exports.new = (type, source) => {
};

exports.reader = reader;

exports.processor = {
  new: () => {
    return {};
  }
};

exports.writer = writer;
