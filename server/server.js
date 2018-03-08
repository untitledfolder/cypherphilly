var config = require('./config');
var neo4j = require('neo4j-driver').v1;
var app = require('express')();

console.log("Config:", config);
var driver = neo4j.driver(config.connect, neo4j.auth.basic(config.neoUser, config.neoPW));
var session = driver.session();

app.get('/police_complaints', (req, res) => {
  session.run(
    'MATCH (p:PoliceComplaint:PoliceComplaintData) RETURN ' +
    'p.cartodb_id AS cartodb_id, ' +
    'p.the_geom AS the_geom, ' +
    'p.the_geom_webmercator AS the_geom_webmercator, ' +
    'p.cap_number AS cap_number , ' +
    'p.date_received AS date_received, ' +
    'p.dist_occurrence AS dist_occurrence, ' +
    'p.general_cap_classification AS general_cap_classification, ' +
    'p.summary AS summary'
  )
  .then(result => {
    res.send(result);
  });
});

app.listen(3000, () => {
  console.log("Server started at 3000");
});
