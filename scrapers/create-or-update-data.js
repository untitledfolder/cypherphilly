function runCypher(session, cypher, data) {
  return session.run(cypher, data);
}

function processLines(session, match, create, update, data) {
  var line = JSON.parse(data.shift());

  runCypher(session, match, line)
  .then(result => {
    (function () {
      if (result.records.length) {
        return runCypher(session, update, line);
      }
      else {
        return runCypher(session, create, line);
      }
    })()
    .then(result => {
      console.log(result);

      if (data.length) {
        processLines(session, match, create, update, data);
      }
    });
  });
}

exports.process = function(session, dataGroupLabel, dataConfig, data) {
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
    update += dataConfig.keys.map( key => "n." + key + " = {" + key + "}").join(", ");
    update += " RETURN n";

    processLines(session, match, create, update, data.split(/\r?\n/));
  }
};
