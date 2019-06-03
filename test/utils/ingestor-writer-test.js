var assert = require('assert');
var { expect } = require('chai');
var sinon = require('sinon');

var mockReadableStream = require('stream').Readable;

var util = require('../../utils/ingest-util');

describe('Writer', () => {
  describe('Init', () => {
    it('should exist', () => {
      assert.ok(util.writer);
    });
  });

  describe('IO', () => {
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
        data = data.toString();
        if (!line1) line1 = data;
        else if (!line2) line2 = data;
        else if (!line3) line3 = data;
        else if (!line4) line4 = data;
        else line5 = data;
      });

      writer.on('end', () => {
        expect(line1).to.equal('\u001b[32mid: \u001b[39m  \u001b[34m1\u001b[39m\n\u001b[32mdata: \u001b[39mData 1');
        expect(line2).to.equal('\u001b[32mid: \u001b[39m  \u001b[34m2\u001b[39m\n\u001b[32mdata: \u001b[39mData 2');
        expect(line3).to.equal('\u001b[32mid: \u001b[39m  \u001b[34m3\u001b[39m\n\u001b[32mdata: \u001b[39mData 3');
        expect(line4).to.be.undefined;
        done();
      });
    });

    it('should output JSON', (done) => {
      writer = util.writer.new(input, 'json');

      writer.on('data', data => {
        console.log("DATA:", data);
        console.log("DATA:", data.toString());
        console.log("DATA:", JSON.parse(data));
        data = JSON.parse(data);
        if (!line1) line1 = data;
        else if (!line2) line2 = data;
        else if (!line3) line3 = data;
        else if (!line4) line4 = data;
        else line5 = data;
      });

      writer.on('end', () => {
        expect(line1).to.equal('{"id":1,"data":"Data 1"}');
        expect(line2).to.equal('{"id":2,"data":"Data 2"}');
        expect(line3).to.equal('{"id":3,"data":"Data 3"}');
        expect(line4).to.be.undefined;
        done();
      });
    });

    it('should output CSV', (done) => {
      writer = util.writer.new(input, 'csv');

      writer.on('data', data => {
        data = data.toString();
        if (!line1) line1 = data;
        else if (!line2) line2 = data;
        else if (!line3) line3 = data;
        else if (!line4) line4 = data;
        else line5 = data;
      });

      writer.on('end', () => {
        expect(line1).to.equal('"id","data"');
        expect(line2).to.equal('"1","Data 1"');
        expect(line3).to.equal('"2","Data 2"');
        expect(line4).to.equal('"3","Data 3"');
        expect(line5).to.be.undefined;
        done();
      });
    });
  });
});
