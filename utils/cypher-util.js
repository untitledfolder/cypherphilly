var cleanString = text => {
  if (typeof text === 'string') text = text.replace(/\\/g, "\\\\");
  if (typeof text === 'string') text = "'" + text.replace(/\'/g, "\\'") + "'";

  return text;
};

var genLabel = (varname, labels, map) => {
  var returnString = '(';

  if (varname) {
    returnString += varname;

    if (labels && labels.length) {
      returnString += ' ';
    }
  }

  if (labels && typeof labels === "string") {
    labels = [labels];
  }

  if (labels && labels.length) {
    returnString += ':' + labels.join(':');
  }

  if (map) {
    returnString += ' ' + map;
  }

  return returnString + ')';
};

var genMap = (mapped) => {
  if (!mapped) return;

  var returnString = '{';

  returnString += Object.keys(mapped).map(map => {
    return map + ": " + cleanString(mapped[map]);
  }).join(', ');

  return returnString + '}';
};

var genQueryStart = (varname, labels, mapped) => {
  return genLabel(varname, labels, genMap(mapped))
};

var genMATCH = (varname, labels, mapped) => {
  return 'MATCH ' + genQueryStart(varname, labels, mapped);
};


var genCREATE = (varname, labels, mapped) => {
  return 'CREATE ' + genQueryStart(varname, labels, mapped);
};

var genMERGE = (varname, labels, mapped) => {
  return 'MERGE ' + genQueryStart(varname, labels, mapped);
};

var genSET = (varname, id, mapped) => {
  var returnString = "";

  Object.keys(mapped).forEach( map => {
    if (map !== id) {
      if (!returnString.length) returnString += "\nSET ";
      else returnString += ", ";

      returnString += varname + "." + map + " = " + cleanString(mapped[map]) + "";
    }
  });

  if (returnString.length) returnString += ";";

  return returnString;
};

var genCreate = (labels, mapped) => {
  var varname = 'n';
  var returnString = "";

  returnString += genCREATE(varname, labels, mapped);

  return returnString;
};

var genCreateOrUpdate = (labels, id, mapped) => {
  var varname = 'n';
  var returnString = "";

  var mergeById = {};
  mergeById[id] = mapped[id];

  returnString += genMERGE(varname, labels, mergeById);
  returnString += genSET(varname, id, mapped);

  return returnString;
};

var genGetIDs = (id, labels) => {
  return genMATCH('n', labels) + ' RETURN n.' + id + ';';
}

var genGetAll = (labels, limit) => {
  var query = genMATCH('n', labels) + ' RETURN n';

  if (limit) {
    console.log("Limit:", limit);
    query += ` LIMIT ${limit}`;
  }
  console.log("Query:", query);
  return query + ';';
}

var genGetByID = (labels, idField, id) => {
  var idMap = {};
  idMap[idField] = id;

  return genMATCH('n', labels, idMap) + ' RETURN n;';
}

exports.genMap = genMap;
exports.genLabel = genLabel;
exports.genCREATE = genCREATE;
exports.genMATCH = genMATCH;
exports.genMERGE = genMERGE;
exports.genSET = genSET;
exports.genCreate = genCreate;
exports.genCreateOrUpdate = genCreateOrUpdate;
exports.genGetIDs = genGetIDs;
exports.genGetAll = genGetAll;
exports.genGetByID = genGetByID;

exports.processNode = (record) => {
  var response = {};

  if (record['_fields'].length) {
    response = record._fields[0].properties
  }

  return response;
};
