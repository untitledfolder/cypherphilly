const { createReadStream } = require('fs');
const { PassThrough } = require('stream');
const http = require('http');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-stream'));

const { HttpReader } = require('../../utils/httpreader');

describe('HttpReader', () => {
  let fixturesDir = 'test/fixtures/data/';

  describe('Init', () => {
    it('should exist', () => {
      expect(HttpReader).to.exist;
    });
  });

  describe('IO', () => {
    let httpReader;
    let httpStub;
    let httpResponse;
    let responsePassthrough;

    beforeEach(() => {
      httpStub = sinon.stub(http, 'get');
      responsePassthrough = new PassThrough();
    });

    afterEach(() => {
      http.get.restore();
    });

    describe('CSV', () => {
      it('should handle HTTP', (done) => {
        httpResponse = createReadStream(fixturesDir + 'example.csv');
        httpStub.callsArgWith(1, httpResponse)
        .returns(responsePassthrough);

        httpReader = new HttpReader(
          'http://data.source/input.csv', 'csv'
        );

        let responseStream = httpReader.start();
        let objectCount = 0;

        responseStream.on('data', data => {
          objectCount += 1;

          if (objectCount === 1) {
            // TODO: Replace awful csv streamer
            expect(data.db_id).to.equal('1');
            expect(data.geom).to.equal('geom1');
            expect(data.id_number).to.equal('102');
            expect(data.date_received).to.equal('2014-01-07T00:00:00Z');
            expect(data.status).to.equal('BAD');
            expect(data.description).to.equal('Summary 1');
            expect(data.active).to.equal('true');
          }
          else if (objectCount === 2) {
            expect(data.db_id).to.equal('2');
            expect(data.geom).to.equal('geom2');
            expect(data.id_number).to.equal('201');
            expect(data.date_received).to.equal('2016-01-09T00:00:00Z');
            expect(data.status).to.equal('GOOD');
            expect(data.description).to.equal('Summary 2');
            expect(data.active).to.equal('false');
          }
          else if (objectCount === 3) {
            expect(data.db_id).to.equal('3');
            expect(data.geom).to.equal('geom3');
            expect(data.id_number).to.equal('303');
            expect(data.date_received).to.equal('2018-02-07T00:00:00Z');
            expect(data.status).to.equal('SOSO');
            expect(data.description).to.equal('Summary 3');
            expect(data.active).to.equal('false');
          }
        });

        responseStream.on('end', () => {
          done();
        });
      });
    });

    describe('JSON', () => {
      it('should handle a JSON File', (done) => {
        httpResponse = createReadStream(fixturesDir + 'example.json');
        httpStub.callsArgWith(1, httpResponse)
        .returns(responsePassthrough);

        httpReader = new HttpReader(
          'http://data.source/input.json', 'json', {root: '!*'}
        );

        let responseStream = httpReader.start();
        let objectCount = 0;

        responseStream.on('data', data => {
          objectCount += 1;

          if (objectCount === 1) {
            expect(data.db_id).to.equal(1);
            expect(data.geom).to.be.null;
            expect(data.id_number).to.equal('102');
            expect(data.date_received).to.equal('2015-01-07T00:00:00Z');
            expect(data.status).to.equal('BAD');
            expect(data.description).to.equal('Summary 1');
          }
          else if (objectCount === 2) {
            expect(data.db_id).to.equal(2);
            expect(data.geom).to.be.null;
            expect(data.id_number).to.equal('201');
            expect(data.date_received).to.equal('2016-01-09T00:00:00Z');
            expect(data.status).to.equal('GOOD');
            expect(data.description).to.equal('Summary 2');
          }
          else if (objectCount === 3) {
            expect(data.db_id).to.equal(3);
            expect(data.geom).to.be.null;
            expect(data.id_number).to.equal('202');
            expect(data.date_received).to.equal('2017-02-07T00:00:00Z');
            expect(data.status).to.equal('SOSO');
            expect(data.description).to.equal('Summary 3');
          }
        });

        responseStream.on('end', () => {
          done();
        });
      });
    });
  });
});
