const fs = require('fs');

function sLowMemoryFileToStream(filename) {
  console.log("Open slow file:", filename);
  return fs.createReadStream(filename, {
    highWaterMark: 1
  });
}

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

return Promise.resolve(sLowMemoryFileToStream(tmpFilename));
