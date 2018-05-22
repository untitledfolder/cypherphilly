var readline = require('readline');

exports.process = function(dataGroupLabel, dataConfig, data) {
  console.log("Processing:", dataConfig.name);
  console.log(" Labels:", dataGroupLabel, dataConfig.label);
  if (dataConfig.keys) {
    console.log("Keys:", dataConfig.keys);
    var match = "MATCH (n: " + dataGroupLabel + ":" + dataConfig.label +
      " {" + dataConfig.id + ": {" + dataConfig.id + "}}) RETURN n";
    var create = "CREATE (n: " + dataGroupLabel + ":" + dataConfig.label + " {";
    create += dataConfig.keys.map( key => key + ": {" + key + "}").join(", ");
    create += "}) RETURN n";
    var update = "MATCH (n: " + dataGroupLabel + ":" + dataConfig.label + " {" +
      dataConfig.id + ": {" + dataConfig.id + "}})\nSET ";
    update += dataConfig.keys.map( key => "p." + key + " = {" + key + "}").join(", ");
    update += " RETURN n";

    console.log("Match:", match);
    console.log("Create:", create);
    console.log("Update:", update);

    data.split(/\r?\n/).forEach(function(line) {
      console.log("\tLine:", line);
    });
  }
};
