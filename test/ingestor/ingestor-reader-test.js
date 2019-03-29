var http = require('http');
var fs = require('fs');
var assert = require('assert');
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-stream'));

var util = require('../../ingestor/ingest-util');

describe.only('Reader', () => {
  var fixturesDir = 'test/fixtures/ingestor/';

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
          reader = util.reader.new('csv', fixturesDir + 'example.csv');

          expect(reader).to.be.a.ReadableStream;
          return expect(reader).to.end;
        });
      });

      describe('JSON', () => {
        it('should handle a JSON File', () => {
          reader = util.reader.new('json', fixturesDir + 'example.json', '!*');

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

      it('should handle HTTP', () => {
        var response = fs.createReadStream(fixturesDir + 'example.json');

        httpStub.returns(response);
        reader = util.reader.new('json', 'http://example.com/example.json', '!*');

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

      reader = util.reader.new('csv', fixturesDir + 'example.csv');

      reader.on('data', data => {
        if (!obj1) obj1 = data;
        else if (!obj2) obj2 = data;
        else if (!obj3) obj3 = data;
        else obj4 = data;
      });

      reader.on('end', () => {
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

    it('should output json as objects', (done) => {
      var obj1;
      var obj2;
      var obj3;
      var obj4;

      reader = util.reader.new('json', fixturesDir + 'example.json', '!*');

      reader.on('data', data => {
        if (!obj1) obj1 = data;
        else if (!obj2) obj2 = data;
        else if (!obj3) obj3 = data;
        else obj4 = data;
      });

      reader.on('end', () => {
        expect(obj1).to.deep.equal({
          cap_number: "13-0001",
          date_received: "2013-01-07T00:00:00Z",
          dist_occurrence: "35",
          general_cap_classification: "BAD",
          summary: "Summary 1",
          the_geom: null,
          the_geom_webmercator: null,
          cartodb_id: 1
        });
        expect(obj2).to.deep.equal({
          cap_number: "13-0002",
          date_received: "2013-01-09T00:00:00Z",
          dist_occurrence: "35",
          general_cap_classification: "GOOD",
          summary: "Summary 2",
          the_geom: null,
          the_geom_webmercator: null,
          cartodb_id: 2
        });
        expect(obj3).to.deep.equal({
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
      assert.fail('not implemented');
    });

    xit('should handle http error', () => {
      assert.fail('not implemented');
    });

    xit('should handle parse error', () => {
      assert.fail('not implemented');
    });
  });
});
