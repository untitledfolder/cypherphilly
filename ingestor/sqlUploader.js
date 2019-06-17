const typeConfig = require("../data-types");
const sqlUtil = require("../utils/sql-util");
const workingDir = __dirname;

exports.SqlUploader = class SqlUploader {

  constructor(uploaderName, sqlConnect, maxUploads, id, table, fields) {
    this.name = uploaderName;
    this.id = id;
    this.table = table;
    this.fields = fields;
    this.maxUploads = maxUploads;
    this.knex = sqlConnect;
  }

  maxUploads() {
    return this.maxUploads;
  }

  createTable() {
    console.log(this.name + " - Creating Table:", this.table);

    return this.knex.createTable(this.table, t => {
      this.fields.forEach(field => {
        let column = field.knex](field.key);

        if (field.key === this.id) column.primary();
      });
    });
  }

  init() {
    this.ids = [];

    return this.knex.schema.hasTable(this.table)
    .then(exists => {
      if (exists) {
        console.log(this.name + " - Table Exists:", this.table);
        return true;
      }

      return this.createTable();
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
