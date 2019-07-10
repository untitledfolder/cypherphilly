const fs = require('fs');

const { Reader } = require('./reader');

exports.FileReader = class FileReader extends Reader {

  constructor(source, type, root) {
    super(source, type, root);

    if (!fs.existsSync(source)) throw `File does not exist: ${source}`
  }

  readData() {
    return fs.createReadStream(this.source);
  }

  start() {
    return this.type === 'csv' ?
      this.csvHandler(this.readData()) :
      this.jsonHandler(this.readData(), this.root);
  }

}
