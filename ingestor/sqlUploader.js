const sqlUtil = require("../utils/sql-util");
const workingDir = __dirname;

exports.SqlUploader = class SqlUploader {

  constructor(uploaderName, sqlConnect, maxUploads, id, table) {
    this.name = uploaderName;
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
      else console.log("Need to create table");

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
    var resolve, reject;
    var done = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });

    if (this.ids.includes(data[this.id])) {
      console.log(" Exists:", this.table, data[this.id]);
      return Promise.resolve(true);
    }

    console.log(" New: ", this.table, data[this.id]);
    //return this.sqlInsert(data);
    setTimeout(() => resolve(true), Math.random() * 1000 + 20);

    return done;
  }

  sqlInsert(data) {
    // Insert this.table by data[this.id]: data
  }

  close() {
  }
}
