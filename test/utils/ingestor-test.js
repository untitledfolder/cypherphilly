var sinon = require('sinon');
var { Readable } = require('stream');
var { expect } = require('chai');

var util = require('../../utils/ingest-util');

var configDir = "test/fixtures/";

const testSource = {
  location: "test/fixtures/sources/example.csv",
  type: 'csv'
};

describe('Ingestor', () => {

  describe('Init', () => {
    it('should exist', () => {
      expect(util).to.be.ok;
    });

    it('should take config and output', () => {
      expect(util.new(testSource, 'json')).to.be.ok;
    });
  });

  describe('ReadWrite', () => {
    it('should make proper writer', (done) => {
      var obj1;
      var obj2;
      var obj3;
      var obj4;

      var ingestor = util.new(testSource, 'json');

      ingestor.on('data', data => {
        data = JSON.parse(data);

        if (!obj1) obj1 = data;
        else if (!obj2) obj2 = data;
        else if (!obj3) obj3 = data;
        else obj4 = data;
      });

      ingestor.on('end', data => {
        expect(obj1).to.deep.equal({
          cap_number: "13-0001",
          date_received: "2013-01-07T00:00:00Z",
          dist_occurrence: "35",
          general_cap_classification: "BAD",
          summary: "Summary 1",
          the_geom: "null",
          the_geom_webmercator: "null",
          cartodb_id: "1"
        });
        expect(obj2).to.deep.equal({
          cap_number: "13-0002",
          date_received: "2013-01-09T00:00:00Z",
          dist_occurrence: "35",
          general_cap_classification: "GOOD",
          summary: "Summary 2",
          the_geom: "null",
          the_geom_webmercator: "null",
          cartodb_id: "2"
        });
        expect(obj3).to.deep.equal({
          cap_number: "13-0003",
          date_received: "2013-02-07T00:00:00Z",
          dist_occurrence: "35",
          general_cap_classification: "SOSO",
          summary: "Summary 3",
          the_geom: "null",
          the_geom_webmercator: "null",
          cartodb_id: "3"
        });

        expect(obj4).to.be.undefined;
        done();
      });
    });
  });
});
