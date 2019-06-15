const cypherUtil = require("../utils/cypher-util");
const workingDir = __dirname;

exports.NeoUploader = class NeoUploader {

  constructor(neoDriver, maxUploads, id, ...labels) {
    console.log("Starting Neo4j Uploader");
    this.id = id;
    this.labels = labels;
    this.session = neoDriver.session();
    this.maxUploads = maxUploads;
    console.log("  Labels:", this.labels.join(' '));
    console.log("  ID Field:", this.id);
  }

  maxUploads() {
    return this.maxUploads;
  }

  init() {
    this.ids = [];

    console.log("Getting ID List");
    return this.session.run(cypherUtil.genGetIDs(this.id, this.labels))
    .then(data => {
      console.log("Got ids");
      data.records.forEach(record => {
        this.ids.push(record.get(0));
      });

      return data;
    });
  }


  upload(data) {
    console.log(this.labels.join(' ') + ", ID Field:", this.id)
    //console.log(data);
    console.log();
    if (this.ids.includes(data[this.id])) {
      console.log(" Exists:", data[this.id]);
      return Promise.resolve(true);
    }

    console.log(" New:", data[this.id]);
    return this.neoUpload(data);
  }

  neoUpload(data) {
    var cypher = cypherUtil.genCreate(this.labels, data);

    return this.session.run(cypher);
  }

  close() {
    this.session.close();
  }
}
