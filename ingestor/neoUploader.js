const neoUtil = require("../utils/cypher-util");

module.exports = class NeoUploader {

  constructor(neoDriver, maxUploads, id, ...labels) {
    console.log("Starting Neo4j Uploader");
    this.id = id;
    this.labels = labels;
    this.session = neoDriver.session();
    this.maxUploads = maxUploads;
  }

  maxUploads() {
    return this.maxUploads;
  }

  upload(data) {
    console.log("Current Data ID:", data[id]);
    return neoUtil.neoUploadIfNew(this.session, data, this.id, this.labels);
  }

  close() {
    this.session.close();
  }
}
