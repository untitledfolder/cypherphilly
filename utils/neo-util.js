const Promise = require("promise");
const neo4j = require("neo4j-driver").v1;
const crypto = require("crypto");
const fs = require("fs");
const readline = require("readline");
const cypherUtil = require("./cypher-util");


var DEBUG = true;


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
      var query = cypherUtil.genCreateOrUpdate(labels, id, line);
      currentlyProcessing += 1;

      if (DEBUG) console.log("Currently processing:", currentlyProcessing);
      if (currentlyProcessing >= maxUploadsPerUploader) {
        if (DEBUG) console.log("~~~ Pausing uploader ~~~");
        paused = true;
        input.pause();
      }

      var query = cypherUtil.genCreateOrUpdate(labels, id, line);
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
