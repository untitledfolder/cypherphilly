const typeConfig = require("../cypherphilly-types");
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

    return this.knex.schema.createTable(this.table, t => {
      this.fields.forEach(field => {
        let type = typeConfig[field.type].knex;
        console.log("  Column:");
        console.log("    Name:", field.key);
        console.log("    Type:", type);
        let column = t[type](field.key);

        if (field.key === this.id) column.primary();
      });
    });
  }

  getIDs() {
    return this.knex.select(this.id).from(this.table);
  }

  sqlInsert(data) {
    return this.knex(this.table).insert(data);
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
      return this.getIDs();
    }).then(ids => {
      this.ids = ids.map(id => id[this.id]);
      console.log("Known ids:", this.ids.join(' '));

      return true;
    });
  }

  upload(data) {
    if (this.ids.includes(data[this.id])) {
      console.log(" Exists:", this.table, data[this.id]);
      return Promise.resolve(true);
    }

    console.log(" New: ", this.table, data[this.id]);
    return this.sqlInsert(data);
  }

  close() {
  }
}
