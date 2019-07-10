const openLineByLine = require("readline").createInterface;
const DEBUG = false;

exports.UploadManager = class UploaderManager {

  constructor(name, input, uploader) {
    this.lineByLine = openLineByLine({
      input: input
    });
    this.name = name;
    this.uploader = uploader;
    this.paused = 0;
    this.finishedData = false;
    this.currentUploads = 0;
    this.maxUploads = uploader.maxUploads;
    this.resolve
    this.reject;
  }

  init() {
    return this.uploader.init();
  }

  pause() {
    if (!this.pause) this.lineByLine.pause();
    this.paused += 1;

    if (DEBUG) console.log(`  ${this.name}: !!! PAUSE ${this.paused} !!!`);
  }

  resume() {
    this.paused -= 1;
    if (!this.paused) this.lineByLine.resume();

    if (DEBUG) console.log(`  ${this.name}: !!! RESUME ${this.paused} !!!`);
  }

  resumeIfPaused() {
    if (this.paused) {
      this.resume();
    }
  }

  close() {
    console.log("FINISHED INPUT:", this.name);
    this.finishedData = true;
  }

  handleLine(line) {
    this.currentUploads += 1;
    if (DEBUG) console.log("  " + this.name + ": Currently Processing - " + this.currentUploads);
    if (this.maxUploads && this.currentUploads >= this.maxUploads) {
      this.pause();
    }

    this.uploader.upload(JSON.parse(line))
    .then(() => {
      this.currentUploads -= 1;
      if (DEBUG) console.log("  " + this.name + ": Currently Processing - " + this.currentUploads);

      this.resumeIfPaused();
      process.nextTick(() => {
        if (this.finishedData && this.currentUploads == 0) {
          console.log("FINISHED UPLOAD:", this.name);
          this.uploader.close();
          resolve(true);
        }
      });
    }).catch(reject);
  }

  uploadData() {
    var retPromise = new Promise((res, rej) => {
      this.resolve = res;
      this.reject = rej;
    });

    console.log("STARTING INPUT:", this.name);

    this.lineByLine.on('close', this.close);

    this.lineByLine.on('line', this.handleLine);

    return retPromise;
  }

}
