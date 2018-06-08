function runCypher(session, cypher, data) {
  return session.run(cypher, data);
}

function generateLabel(dataLabel, groupLabel) {
  var label = "";

  if (dataLabel) {
    label += ": ";

    if (groupLabel) {
      label += groupLabel + ":";
    }
    label += dataLabel;
  }

  return label;
}

function generateId(dataId) {
  var id = "";

  if (dataId) {
    id += " {" + dataId + ": {" + dataId + "}}";
  }

  return id;
}

function generateMatch(dataConfig) {
  var match = "MATCH (n";

  match += generateLabel(dataConfig.label, dataConfig.groupLabel);
  match += generateId(dataConfig.id);

  match += ") RETURN n";

  return match;
}

function generateCreate(dataConfig) {
  var create = "CREATE (n";

  create += generateLabel(dataConfig.label, dataConfig.groupLabel);

  create += " {";
  create += dataConfig.keys.map( key => key + ": {" + key + "}").join(", ");
  create += "}) RETURN n";

  return create;
}

function generateUpdate(dataConfig) {
  var update = "MATCH (n";

  update += generateLabel(dataConfig.label, dataConfig.groupLabel);
  update += generateId(dataConfig.id);

  update += ")\nSET ";
  update += dataConfig.keys.map( key => "n." + key + " = {" + key + "}").join(", ");
  update += " RETURN n";

  return update;
}

function processLines(session, dataConfig, data) {
  function next(session, dataConfig, data) {
    if (data.length) {
      processLines(session, dataConfig, data);
    }
  }

  try {
    var dataLine = data.shift();
    var line = {};
    if (dataLine) {
      line = JSON.parse(dataLine);
    }
  }
  catch (error) {
    console.log("Error parsing line:", dataLine);
  }

  if (line[dataConfig.id]) {
    console.log("Processing (" + dataConfig.id + "):", line[dataConfig.id]);
    console.log("  match:", generateMatch(dataConfig));
    console.log("  create:", generateCreate(dataConfig));
    console.log("  update:", generateUpdate(dataConfig));

    runCypher(session, generateMatch(dataConfig), line)
    .then(result => {
      console.log("  " + line[dataConfig.id] + ": " + result.records.length ? "Found" : "New Record");

      return result.records.length ?
        runCypher(session, generateUpdate(dataConfig), line) :
        runCypher(session, generateCreate(dataConfig), line);
    })
    .then(result => {
      console.log("  " + line[dataConfig.id] + ": Uploaded");

      setTimeout(function() {
        next(session, dataConfig, data);
      }, 0);
    })
    .catch(err => {
      console.log("  " + line[dataConfig.id] + ": Failed");
      console.log("NEO ERROR:", err);
      next(session, dataConfig, data);
    });
  }
}

exports.process = function(session, label, dataConfig, data) {
  console.log("Processing:", dataConfig.name);
  console.log(" Labels:", label, dataConfig.label);
  // TODO: Make this easier
  dataConfig.groupLabel = label;

  if (dataConfig.keys && dataConfig.id) {
    console.log("Keys:", dataConfig.keys);
    console.log("ID:", dataConfig.id);

    processLines(session, dataConfig, data.split(/\r?\n/));
  }
};
