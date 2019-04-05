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
  var returnString = '{';

  returnString += Object.keys(mapped).map(map => {
    return map + ": '" + mapped[map] + "'";
  }).join(', ');

  return returnString + '}';
};

var genQueryStart = (varname, labels, mapped) => {
  return genLabel(varname, labels, genMap(mapped))
};

exports.genMap = genMap;
exports.genLabel = genLabel;

var queryStartGenerators = ["MATCH", "CREATE", "MERGE"];

queryStartGenerators.forEach(startGenerator => {
  exports['gen' + startGenerator] = (varname, labels, mapped) => {
    return startGenerator + ' ' + genQueryStart(varname, labels, mapped);
  };
});

exports.genSET = (varname, id, mapped) => {
  var returnString = "";

  Object.keys(mapped).forEach( map => {
    if (map !== id) {
      returnString += "\nSET " + varname + "." + map + " = '" + mapped[map] + "';";
    }
  });

  return returnString;
};
