exports.genLabel = (varname) => {
  var returnString = '(';

  if (varname) {
    returnString += varname;
  }

  return returnString + ')';
};
