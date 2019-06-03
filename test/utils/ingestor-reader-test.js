var http = require('http');
var fs = require('fs');
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-stream'));

var util = require('../../utils/ingest-util');

describe('Reader', () => {
  var fixturesDir = 'test/fixtures/sources/';

  describe('Init', () => {
    it('should exist', () => {
      expect(util.reader).to.be.ok;
    });
  });

  describe('Params', () => {
    var reader;

    describe('File', () => {
      describe('CSV', () => {
        it('should handle a CSV File', () => {
          reader = util.reader({
            type: 'csv',
            location: fixturesDir + 'example.csv'
          });

          expect(reader).to.be.a.ReadableStream;
          return expect(reader).to.end;
        });
      });

      describe('JSON', () => {
        it('should handle a JSON File', () => {
          reader = util.reader({
            type: 'json',
            location: fixturesDir + 'example.json',
            root: '!*'
          });

          expect(reader).to.be.a.ReadableStream;
          return expect(reader).to.end;
        });
      });
    });

    describe('HTTP', () => {
      var httpStub;

      beforeEach(() => {
        httpStub = sinon.stub(http, 'get');
      });

      xit('should handle HTTP', () => {
        var response = fs.createReadStream(fixturesDir + 'example.json');

        httpStub.returns(response);
        reader = util.reader({
          type: 'json',
          location: 'http://example.com/example.json',
          root: '!*'
        });

        expect(reader).to.be.a.ReadableStream;
        return expect(reader).to.end;
      });

      afterEach(() => {
        http.get.restore();
      });
    });
  });

  describe('IO', () => {
    it('should output csv as objects', (done) => {
      var obj1;
      var obj2;
      var obj3;
      var obj4;

      reader = util.reader({
        type: 'csv',
        location: fixturesDir + 'example.csv'
      });

      reader.on('data', data => {
        if (!obj1) obj1 = data;
        else if (!obj2) obj2 = data;
        else if (!obj3) obj3 = data;
        else obj4 = data;
      });

      reader.on('end', () => {
        expect(JSON.parse(obj1)).to.deep.equal({
          cap_number: "13-0001",
          date_received: "2013-01-07T00:00:00Z",
          dist_occurrence: "35",
          general_cap_classification: "BAD",
          summary: "Summary 1",
          the_geom: "null",
          the_geom_webmercator: "null",
          cartodb_id: "1"
        });
        expect(JSON.parse(obj2)).to.deep.equal({
          cap_number: "13-0002",
          date_received: "2013-01-09T00:00:00Z",
          dist_occurrence: "35",
          general_cap_classification: "GOOD",
          summary: "Summary 2",
          the_geom: "null",
          the_geom_webmercator: "null",
          cartodb_id: "2"
        });
        expect(JSON.parse(obj3)).to.deep.equal({
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

    it('should output json as objects', (done) => {
      var obj1;
      var obj2;
      var obj3;
      var obj4;

      reader = util.reader({
        type: 'json',
        location: fixturesDir + 'example.json',
        root: '!*'
      });

      reader.on('data', data => {
        if (!obj1) obj1 = data;
        else if (!obj2) obj2 = data;
        else if (!obj3) obj3 = data;
        else obj4 = data;
      });

      reader.on('end', () => {
        expect(JSON.parse(obj1)).to.deep.equal({
          cap_number: "13-0001",
          date_received: "2013-01-07T00:00:00Z",
          dist_occurrence: "35",
          general_cap_classification: "BAD",
          summary: "Summary 1",
          the_geom: null,
          the_geom_webmercator: null,
          cartodb_id: 1
        });
        expect(JSON.parse(obj2)).to.deep.equal({
          cap_number: "13-0002",
          date_received: "2013-01-09T00:00:00Z",
          dist_occurrence: "35",
          general_cap_classification: "GOOD",
          summary: "Summary 2",
          the_geom: null,
          the_geom_webmercator: null,
          cartodb_id: 2
        });
        expect(JSON.parse(obj3)).to.deep.equal({
          cap_number: "13-0003",
          date_received: "2013-02-07T00:00:00Z",
          dist_occurrence: "35",
          general_cap_classification: "SOSO",
          summary: "Summary 3",
          the_geom: null,
          the_geom_webmercator: null,
          cartodb_id: 3
        });
        expect(obj4).to.be.undefined;
        done();
      });
    });
  });

  xdescribe('Error', () => {
    xit('should handle file doesn\'t exist', () => {
    });

    xit('should handle http error', () => {
    });

    xit('should handle parse error', () => {
    });
  });
});
