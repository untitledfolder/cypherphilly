var prettyjson = require("prettyjson");
var { spawn } = require('child_process');

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

exports.new = () => {
  return {};
};

exports.reader = {
  new: () => {
    return {};
  }
};

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
