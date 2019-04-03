var sinon = require('sinon');
var { Readable } = require('stream');
var { expect } = require('chai');

var util = require('../../ingestor/ingest-util');

var configDir = "test/fixtures/";

const testSource = {
  location: "test/fixtures/ingestor/example.csv",
  type: 'csv'
};

describe.only('Ingestor', () => {

  describe('Init', () => {
    it('should exist', () => {
      expect(util).to.be.ok;
    });

    it('should take config and output', () => {
      expect(util.new(testSource, 'output')).to.be.ok;
    });
  });

  describe('ReadWrite', () => {
    it('should make proper reader', () => {
      var readerStub = sinon.stub(util.reader, 'new');
      var ingestor = util.new(testSource, 'output');

      expect(readerStub.calledWith(testSource)).to.be.true;
    });

    it('should make proper writer', (done) => {
      var obj1;
      var obj2;
      var obj3;
      var obj4;

      var readerStub = sinon.stub(util.reader, 'new');
      var streamStub = new Readable({read() {}});
      readerStub.andReturn(streamStub);
      var writerStub = sinon.stub(util.writer, 'new');
      var ingestor = util.new(testSource, 'output');

      ingestor.on('data', data => {
        if (!obj1) obj1 = data;
        else if (!obj2) obj2 = data;
        else if (!obj3) obj3 = data;
        else obj4 = data;
      });

      streamStub.push({
        cartodb_id: 1,
        the_geom: null,
        the_geom_webmercator: null,
        cap_number: "13-0001",
        date_received: "2013-01-07T00:00:00Z",
        dist_occurrence: "35",
        general_cap_classification: "BAD",
        summary: "Summary 1"
      });

      streamStub.push({
        cap_number: "13-0002",
        date_received: "2013-01-09T00:00:00Z",
        dist_occurrence: "35",
        general_cap_classification: "GOOD",
        summary: "Summary 2",
        the_geom: null,
        the_geom_webmercator: null,
        cartodb_id: 2
      });

      streamStub.push({
        cap_number: "13-0003",
        date_received: "2013-02-07T00:00:00Z",
        dist_occurrence: "35",
        general_cap_classification: "SOSO",
        summary: "Summary 3",
        the_geom: null,
        the_geom_webmercator: null,
        cartodb_id: 3
      });

      streamStub.push(null);

      ingestor.on('end', data => {
        expect(writerStub.calledWith(streamStub, 'output')).to.be.true;

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

    afterEach(() => {
      util.reader.new.restore();
      if (util.writer.new.restore) eutil.writer.new.restore();
    });
  });
});
