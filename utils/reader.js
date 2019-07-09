const { Readable } = require('stream');

const csv = require('csv-stream')
const oboe = require('oboe');

exports.Reader = class Reader {

  /**
   * constructor
   *
   * @param {string} source - Where the data is located
   * @param {string} type - Data type. Currently can be csv or json
   * @param {Object} root - Root location for reading json
   */
  constructor(source, type, root) {
    this.source = source;
    this.type = type;
    this.root = root;
  }


  /*** HELPERS ***/

  /**
   * Convert a CSV input stream into individual Objects.
   *
   * @param {Readable Stream} input - CSV Stream to convert to Objects
   * @return {Readable Object Stream} An Object Stream version of the Data Source stream
   */
  csvHandler(input) {
    return input.pipe(csv.createStream({enclosedChar: '"'}));
  }

  /**
   * Convert a JSON input stream into individual Objects.
   *
   * @param {Readable Stream} input - JSON Stream to convert to Objects
   * @param {string} rootPath - Where to find the JSON data you care about.
   * @return {Readable Object Stream} And Object Stream version of the Data Source stream
   */
  jsonHandler(input, rootPath) {
    var output = new Readable({objectMode: true, read() {}});

    oboe(input)
      .node(rootPath, data => output.push(data))
      .on('fail', err => output.destroy(err))
      .on('done', () => output.push(null));

    return output;
  }
}
