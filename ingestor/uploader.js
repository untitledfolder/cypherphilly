const Promise = require('promise');
const openLineByLine = require("readline").createInterface;

module.exports class UploaderManager {

  constructor(input, uploader) {
    this.lineByLine = openLineByLine({
      input: input
    });
    this.uploader = uploader;
    this.finishedData = false;

    this.maxUploads = uploaders.maxUploads ? uploaders.maxUploads : 5;
  }

  uploadData() {
    var resolve, reject;
    var retPromise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    var currentUploads = 0;

    this.lineByLine.on('close', () => {
      this.finishedData = true;
    });

    this.lineByLine.on('line', line => {
      currentUploads += 1;
      if (currentUploads >= this.maxUploads) {
        lineByLine.pause();
      }

      uploader.handleData(JSON.parse(line))
      .then(() => {
        currentUploads -= 1;

        if (this.finishedData && currentUploads == 0) {
          this.uploader.close();
          resolve(true);
        }
        else {
          this.lineByLine.resume();
        }
      }).catch(reject));
    });

    return retPromise;
  }

}
