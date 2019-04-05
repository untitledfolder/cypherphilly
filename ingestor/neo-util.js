exports.genLabel = (varname, labels) => {
  var returnString = '(';

  if (varname) {
    returnString += varname;

    if (labels && labels.length) {
      returnString += ' ';
    }
  }

  if (labels && labels.length) {
    returnString += ':' + labels[0];
  }

  return returnString + ')';
};
