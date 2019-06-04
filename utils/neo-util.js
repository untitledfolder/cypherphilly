const Promise = require("promise");
const openLineByLine = require("readline").createInterface;

const cypherUtil = require("./cypher-util");
const neo4j = require("neo4j-driver").v1;


/*** Helpers */
function handleNeoResponse(response) {
  return response.records;
}

function neoUploadIfNew(session, data, id, ...labels) {
  console.log("Checking for data with:", labels, data[id]);

  return neoGetByID(session, data, id, ...labels)
  .then(response => {
    if (response.length) {
      console.log("  #ALREADY EXISTS:", labels, data[id]);
      return true;
    }

    console.log("  #NEW DATA:", labels, data[id]);
    return neoUpload(session, data, id, ...labels);
  });
}

function neoGetByID(session, data, id, ...labels) {
  console.log("Get by id:", labels, id, data[id]);

  var cypher = cypherUtil.genGetByID(labels, id, data[id]);
  console.log("CYPHER:", cypher);

  return session.run(cypher)
  .then(handleNeoResponse);
}

function neoUpload(session, data, id, ...labels) {
  console.log("Doing upload:", data[id]);

  var cypher = cypherUtil.genCREATE('n', labels, data)
  console.log("CYPHER:", cypher);

  return session.run(cypher)
  .then(handleNeoResponse);
}

/**
 * Neo Upload Manager
 */
exports.new = (neoConfig, debug) => {
  if (debug) {
    console.log("Connection to:", neoConfig.host);
  }
  var driver = neo4j.driver(
    neoConfig.host,
    neo4j.auth.basic(neoConfig.user, neoConfig.password)
  );

  return {
    driver: driver,
    newUploader: (input, id, ...labels) => {
      console.log("Starting Neo4j uploader");
      if (debug) {
        console.log("Data Labels:", labels.join(' '));
        console.log("Data ID:", id);
      }

      var resolve, reject;
      var returnPromise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      var done = false;
      var processing = 0;
      var paused = false;
      var session = driver.session();
      var lineByLine = openLineByLine({
        input: input
      });

      lineByLine.on('close', () => done = true);
      lineByLine.on('line', line => {
        var data = JSON.parse(line);
        processing += 1;

        if (debug) {
          console.log();
          console.log("Current Data ID:", data[id]);
          console.log("Processing Count:", processing);
        }
        if (processing >= neoConfig.max_uploads) {
          if (debug) {
            console.log("!!! Pausing Uploader !!!");
          }
          paused = true;
          lineByLine.pause();
        }

        neoUploadIfNew(session, data, id, ...labels)
        .then(() => {
          processing -= 1;
          if (debug) {
            console.log("Finished Data ID:", data[id]);
          }

          if (paused) {
            if (debug) {
              console.log("!!! Unpausing Uploader !!!");
            }
            paused = false;
            lineByLine.resume();
          }

          if (done && !processing) {
            if (debug) {
              console.log("Uploader complete!");
            }
            session.close();
            resolve();
          }
        })
        .catch(err => {
          console.log("Error:", err);
          reject(err);
        });
      });

      return returnPromise;
    },
    close: () => {
      if (debug) {
        console.log("Closing Neo4j");
      }
      driver.close();
    }
  };
}
