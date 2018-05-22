var readline = require('readline');

exports.process = function(dataGroupLabel, dataConfig, data) {
  console.log("Processing:", dataConfig.name);
  console.log(" Labels:", dataGroupLabel, dataConfig.label);
  if (dataConfig.keys) {
    console.log("Keys:", dataConfig.keys);
  }
};
