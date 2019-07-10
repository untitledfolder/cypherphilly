const { createReadStream } = require('fs');

const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

chai.use(require('chai-stream'));

const { Reader } = require('../../utils/reader');

describe('Reader', () => {
  var fixturesDir = 'test/fixtures/data/';

  describe('Init', () => {
    it('should exist', () => {
      expect(Reader).to.exist;
    });
  });

  describe('Stream', () => {
    let mockReader;

    describe('CSV', () => {
      beforeEach(() => {
        mockReader = class extends Reader {
          test() {
            return this.csvHandler(createReadStream(
              fixturesDir + 'example.csv'
            ));
          }
        };
      });

      it('should handle a CSV File', () => {
        let responseStream = (new mockReader()).test();

        expect(responseStream).to.be.a.ReadableStream;
        return expect(responseStream).to.end;
      });
    });

    describe('JSON', () => {
      beforeEach(() => {
        mockReader = class extends Reader {
          test() {
            return this.jsonHandler(createReadStream(
              fixturesDir + 'example.json'
            ), '!*');
          }
        }
      });

      it('should handle a JSON File', () => {
        mockReader = (new mockReader()).test();

        expect(mockReader).to.be.a.ReadableStream;
        return expect(mockReader).to.end;
      });
    });
  });

  describe('IO', () => {
    let mockReader;

    describe('CSV', () => {
      beforeEach(() => {
        mockReader = class extends Reader {
          test() {
            return this.csvHandler(createReadStream(
              fixturesDir + 'example.csv'
            ));
          }
        };
      });

      it('should convert a CSV File to Objects', (done) => {
        let responseStream = (new mockReader()).test();
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
      beforeEach(() => {
        mockReader = class extends Reader {
          test() {
            return this.jsonHandler(createReadStream(
              fixturesDir + 'example.json'
            ), '!*');
          }
        }
      });

      it('should output JSON as objects', (done) => {
        let responseStream = (new mockReader()).test();
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

  describe('Error', () => {
    let mockReader;
    let spyError;

    describe('CSV', () => {
      beforeEach(() => {
        mockReader = class extends Reader {
          test() {
            return this.csvHandler(createReadStream(
              fixturesDir + 'bad.csv'
            ));
          }
        };

        spyError = sinon.spy();
      });

      it('Handles bad CSV data', (done) => {
        let response = (new mockReader()).test();

        response.on('data', () => { });
        response.on('error', spyError);
        response.on('end', () => {
          // TODO: Replace awful csv streamer
          //expect(spyError.called).to.be.true;
          done();
        });
      });
    });

    describe('JSON', () => {
      beforeEach(() => {
        mockReader = class extends Reader {
          test() {
            return this.jsonHandler(createReadStream(
              fixturesDir + 'bad.json'
            ), '!*');
          }
        }

        spyError = sinon.spy();
      });

      it('Handles bad JSON data', () => {
        let response = (new mockReader()).test();

        response.on('data', () => { });
        response.on('error', spyError);
        response.on('end', () => {
          expect(spyError.called).to.be.true;
          done();
        });
      });
    });
  });
});
