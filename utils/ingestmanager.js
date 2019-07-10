const { createReadStream } = require('fs');
const { Transform } = require('stream');

const { FileReader } = require('./filereader');
const { HttpReader } = require('./httpreader');


exports.IngestManager = class IngestManager {

  constructor(source) {
    this.source = source;

    this.reader = new (source.location.match(/^https?/) ?
      HttpReader : FileReader
    )(source.location, source.type, source.root);
  }

  start() {
    return this.flattener(this.reader.start());
  }

  /**
   * Turn the objects into a series of objects that are flattened
   * and separated by an end line for easy handling.
   *
   * @param {stream} input - An input stream of Objects
   * @return {stream} A flattened, stringified version of the Objects
   */
  flattener(input) {
    return input.pipe(new Transform({
      writableObjectMode: true,
      readableDecodeStrings: false,
      transform(data, _, done) {
        done(null, JSON.stringify(data) + '\n');
      }
    }));
  }

}
