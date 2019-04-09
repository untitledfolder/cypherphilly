var neo4j = require("neo4j-driver").v1;
var { Writable } = require("stream");

var cleanString = text => {
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

var genCreateOrUpdate = (labels, id, mapped) => {
  var varname = 'n';
  var returnString = "";

  var mergeById = {};
  mergeById[id] = mapped[id];

  returnString += genMERGE(varname, labels, mergeById);
  returnString += genSET(varname, id, mapped);

  return returnString;
};

exports.genMap = genMap;
exports.genLabel = genLabel;
exports.genCREATE = genCREATE;
exports.genMATCH = genMATCH;
exports.genMERGE = genMERGE;
exports.genSET = genSET;
exports.genCreateOrUpdate = genCreateOrUpdate;

exports.new = config => {
  var neoConfig = require(config);
  var driver = neo4j.driver(neoConfig.host, neo4j.auth.basic(neoConfig.user, neoConfig.password));
  var alldone = false;

  var neoManager = {
    uploader: (labels, id) => {
      var session = driver.session();
      var hasComplete = false;
      var currentlyProcessing = 0;

      writer = new Writable({
        write: (data, encoding, c) => {
          var parsed = JSON.parse(data);

          currentlyProcessing += 1;
          session.run(genCreateOrUpdate(labels, id, parsed))
          .subscribe({
            onCompleted: function () {
              currentlyProcessing -= 1;
              console.log("Upload:");
              console.log("  Labels:", labels);
              console.log("  ID:", parsed[id]);

              if (hasComplete && currentlyProcessing <= 0) {
                console.log("Done!");
                session.close();

                if (alldone) {
                  driver.close();
                }
              }
              else {
                console.log("Still reading?", hasComplete ? 'No' : 'Yes');
                console.log("Processing:", currentlyProcessing);
              }
            },
            onError: function (error) {
              console.log(error);
            }
          });

          c();
        }
      });

      writer.on('finish', () => {
        console.log("Data ended");

        hasComplete = true;
      });

      return writer;
    },

    done: () => {
      alldone = true;
    }
  };

  return neoManager;
};
