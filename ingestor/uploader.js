const Promise = require('promise');
const openLineByLine = require("readline").createInterface;
const DEBUG = false;

exports.UploadManager = class UploaderManager {

  constructor(input, uploader) {
    this.lineByLine = openLineByLine({
      input: input
    });
    this.uploader = uploader;
    this.paused = false;
    this.finishedData = false;
    this.maxUploads = uploader.maxUploads;
  }

  init() {
    return this.uploader.init();
  }

  uploadData() {
    var resolve, reject;
    var retPromise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    var currentUploads = 0;

    console.log("STARTING INPUT:", this.uploader.name);

    this.lineByLine.on('close', () => {
      console.log("FINISHED INPUT:", this.uploader.name);
      this.finishedData = true;
    });

    this.lineByLine.on('line', line => {
      currentUploads += 1;
      if (DEBUG) console.log("  " + this.uploader.name + ": Currently Processing - " + currentUploads);
      if (this.maxUploads && currentUploads >= this.maxUploads) {
        if (DEBUG) console.log("  " + this.uploader.name + ": !!! PAUSE !!!");
        this.paused = true;
        this.lineByLine.pause();
      }

      this.uploader.upload(JSON.parse(line))
      .then(() => {
        currentUploads -= 1;
        if (DEBUG) console.log("  " + this.uploader.name + ": Currently Processing - " + currentUploads);

        if (this.paused) {
          if (DEBUG) console.log("  " + this.uploader.name + ": !!! RESUME !!!");
          this.paused = false;
          this.lineByLine.resume();
        }
        process.nextTick(() => {
          if (this.finishedData && currentUploads == 0) {
            console.log("FINISHED UPLOAD:", this.uploader.name);
            this.uploader.close();
            resolve(true);
          }
        });
      }).catch(reject);
    });

    return retPromise;
  }

}
