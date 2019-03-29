var assert = require('assert');
var { expect } = require('chai');
var sinon = require('sinon');

var mockReadableStream = require('stream').Readable;

var util = require('../../ingestor/ingest-util');

describe.only('Writer', () => {
  describe('Init', () => {
    it('should exist', () => {
      assert.ok(util.writer);
    });

    it('should take output and processed io', () => {
      assert.ok(util.writer.new('processedio', 'output'));
    });
  });

  describe.only('IO', () => {
    var input;
    var writer;
    var line1;
    var line2;
    var line3;
    var line4;
    var line5;

    beforeEach(() => {
      line1 = undefined;
      line2 = undefined;
      line3 = undefined;
      line4 = undefined;
      line5 = undefined;

      input = new mockReadableStream({
        objectMode: true,
        read() {}
      });

      input.push({
        id: 1,
        data: "Data 1"
      });
      input.push({
        id: 2,
        data: "Data 2"
      });
      input.push({
        id: 3,
        data: "Data 3"
      });
      input.push(null);
    });

    it('should output pp', (done) => {
      writer = util.writer.new(input, 'pp');

      writer.on('data', data => {
        if (!line1) line1 = data;
        else if (!line2) line2 = data;
        else if (!line3) line3 = data;
        else if (!line4) line4 = data;
        else line5 = data;
      });

      writer.on('end', () => {
        expect(line1).to.equal('Hello');
        expect(line2).to.equal('Hello');
        expect(line3).to.equal('Hello');
        expect(line4).to.equal('Hello');
        expect(line5).to.equal('Hello');
        done();
      });
    });

    it('should output JSON', (done) => {
      writer = util.writer.new(input, 'json');

      expect(line1).to.equal('Hello');
      expect(line2).to.equal('Hello');
      expect(line3).to.equal('Hello');
      expect(line4).to.equal('Hello');
      expect(line5).to.equal('Hello');
      done();
    });

    it('should output CSV', (done) => {
      writer = util.writer.new(input, 'csv');

      expect(line1).to.equal('Hello');
      expect(line2).to.equal('Hello');
      expect(line3).to.equal('Hello');
      expect(line4).to.equal('Hello');
      expect(line5).to.equal('Hello');
      done();
    });
  });
});
