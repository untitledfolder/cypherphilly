exports.process = function(dataConfig, data) {
  console.log("Processing:", dataConfig.name);
  if (dataConfig.keys) {
    console.log("Keys:", dataConfig.keys);
  }
};
