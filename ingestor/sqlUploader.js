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

    return this.knex.schema.hasTable(this.table)
    .then(exists => {
      if (exists) console.log("Exists!");

      return true;
      //return this.knex.createTable(this.table, t => {
      //t.fields:
      //  t.increments('id').primary();
      //  t.string('first_name', 100);
    }).then(() => {
      console.log("Getting ID List");
      // Select this.id from this.table
      return true;//this.knex.select(this.id).from(this.table);
    }).then(ids => {
      // Iterate through each
      // this.ids.push(item.id);
      return true;
    });
  }

  upload(data) {
    if (this.ids.includes(data[this.id])) {
      console.log(" Exists:", this.table, data[this.id]);
      return Promise.resolve(true);
    }

    console.log(" New: ", this.table, data[this.id]);
    //return this.sqlInsert(data);
    return Promise.resolve(true);
  }

  sqlInsert(data) {
    // Insert this.table by data[this.id]: data
  }

  close() {
    this.session.close();
  }
}
