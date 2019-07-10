const cypherUtil = require("../utils/cypher-util");
const workingDir = __dirname;

exports.NeoUploader = class NeoUploader {

  constructor(name, neoDriver, maxUploads, id, ...labels) {
    this.name = name;
    this.id = id;
    this.labels = labels;
    this.session = neoDriver.session();
    this.maxUploads = maxUploads;
    console.log(`Starting Neo4j Uploader: ${this.name}`);
    console.log("  Labels:", this.labels.join(' '));
    console.log("  ID Field:", this.id);
  }

  maxUploads() {
    return this.maxUploads;
  }

  init() {
    this.ids = [];

    console.log(`${this.name}: Getting ID List`);
    return this.session.run(cypherUtil.genGetIDs(this.id, this.labels))
    .then(data => {
      console.log(`${this.name}: Got ids`);
      data.records.forEach(record => {
        this.ids.push(record.get(0));
      });

      return data;
    });
  }


  upload(data) {
    console.log(this.name, this.labels.join(' ') + ", ID Field:", this.id)
    if (this.ids.includes(data[this.id])) {
      console.log(`${this.name}: Exists: ${data[this.id]}`);
      return Promise.resolve(true);
    }

    console.log(`${this.name}: New:  ${data[this.id]}`);
    return this.neoUpload(data);
  }

  neoUpload(data) {
    let uploadID = {};
    uploadID[this.id] = data[this.id];

    var cypher = cypherUtil.genCreate(this.labels, uploadID);

    return this.session.run(cypher);
  }

  close() {
    this.session.close();
  }
}
