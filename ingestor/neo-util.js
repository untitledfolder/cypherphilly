const Promise = require("promise");
const neo4j = require("neo4j-driver").v1;
const crypto = require("crypto");
const fs = require("fs");
const readline = require("readline");


var DEBUG = true;

/**
 * Helpers
 *
 * TODO: Description
 */
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


/**
 * Neo Upload Manager
 *
 *
 * Description:
 *
 *
 * Usage:
 *
 *
 * Parameters:
 *
 *
 * Output:
 *
 *
 * Examples:
 *
 *
 */
exports.new = neoConfig => {
  var maxUploadsPerUploader = neoConfig.max_uploads ? neoConfig.max_uploads : 5;

  var neoManager = {
    driver: neo4j.driver(neoConfig.host, neo4j.auth.basic(neoConfig.user, neoConfig.password)),
    uploaders: 0,
    shouldClose: false
  };

  neoManager.uploader = (input, id, ...labels) => {
    if (neoManager.shouldClose) {
      return Promise.reject("Can't make new Uploaders after closing");
    }

    console.log("Starting Neo4j uploader");
    var session = neoManager.driver.session();
    var ret, resolve, reject;
    ret = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });

    var lineReader = readline.createInterface({
      input: input
    });

    var currentlyProcessing = 0;
    var paused = false;
    lineReader.on('line', line => {
      line = JSON.parse(line);
      if (DEBUG) console.log(line);
      var query = genCreateOrUpdate(labels, id, line);
      currentlyProcessing += 1;

      if (DEBUG) console.log("Currently processing:", currentlyProcessing);
      if (currentlyProcessing >= maxUploadsPerUploader) {
        if (DEBUG) console.log("~~~ Pausing uploader ~~~");
        paused = true;
        input.pause();
      }

      var query = genCreateOrUpdate(labels, id, line);
      if (DEBUG) console.log("Query:", query);
      session.run(query)
      .subscribe({
        onCompleted: function () {
          if (DEBUG) console.log("Done processing line:", line);
          currentlyProcessing -= 1;
          if (DEBUG) console.log("Currently processing:", currentlyProcessing);

          if (paused && currentlyProcessing < Math.round(maxUploadsPerUploader * 0.8)) {
            if (DEBUG) console.log("~~~ Resuming uploader ~~~");
            paused = false;
            input.resume();
          }
        },
        onError: function (error) {
          console.log("Neo4j Error:", error);
        }
      });
    });

    input.on('end', () => {
      console.log("Done");
      console.log("Should close?:", neoManager.shouldClose);
    });

    // Once done, close the promise

    return ret;
  };

  neoManager.done = () => {
    neoManager.shouldClose = true;
  };

  return neoManager;
};
