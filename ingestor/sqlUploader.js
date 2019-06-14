const sqlUtil = require("../utils/sql-util");
const workingDir = __dirname;

exports.SqlUploader = class SqlUploader {

  constructor(sqlConnect, maxUploads, id, table) {
    this.id = id;
    this.table = table;
    this.maxUploads = maxUploads;
    this.knex = sqlConnect;
  }

  maxUploads() {
    return this.maxUploads;
  }

  init() {
    this.ids = [];

    this.knex.schema.hasTable(this.table)
    .then(exists => {
      return exists;
    }).then(() => {
      console.log("Table exists?", exists);
      debugger;
    });
  }

  upload(data) {
    if (this.ids.includes(data[this.id])) {
      console.log(" Exists:", data[this.id]);
      return Promise.resolve(true);
    }

    console.log(" New: ", data[this.id]);
    return this.sqlInsert(data);
  }

  sqlInsert(data) {
    // Insert this.table by data[this.id]: data
  }

  close() {
    this.session.close();
  }
}
