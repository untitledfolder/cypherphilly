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

  xdescribe('IO', () => {
    xit('should generate io', () => {
      assert.fail('not implemented');
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
