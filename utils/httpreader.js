const http = require('http');
const https = require('https');
const { Readable } = require('stream');

const { Reader } = require('./reader');


exports.HttpReader = class HttpReader extends Reader {

  constructor(source, type, root) {
    super(source, type, root);
  }

  readData() {
    let output = new Readable({read() {}});

    (this.source.match(/^https/) ? https : http)
      .get(this.source, res => {
        res.on('data', data => output.push(data));
        res.on('end', () => output.push(null));
      })
      .on('error', err => console.log(err));

    return output;
  }

  start() {
    return this.type === 'csv' ?
      this.csvHandler(this.readData()) :
      this.jsonHandler(this.readData(), this.root);
  }

}
