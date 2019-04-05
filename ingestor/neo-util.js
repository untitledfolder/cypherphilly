var genLabel = (varname, labels, map) => {
  var returnString = '(';

  if (varname) {
    returnString += varname;

    if (labels && labels.length) {
      returnString += ' ';
    }
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

exports.genMap = genMap;
exports.genLabel = genLabel;

exports.genMATCH = (varname, labels, mapped) => {
  return "MATCH " + genLabel(varname, labels, genMap(mapped));
};
