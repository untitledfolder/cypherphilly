var assert = require('assert');

var util = require('../../ingestor/ingest-util');

var configDir = ".";

describe('Ingestor', () => {
  describe('Init', () => {
    it('should exist', () => {
      assert.ok(util);
    });

    it('should take config and output', () => {
      assert.ok(util.new(configDir + '/example.conf', 'output'));
    });
  });

  xdescribe('Config', () => {
    xit('should handle type', () => {
      assert.fail('not implemented');
    });

    xit('should handle source', () => {
      assert.fail('not implemented');
    });

    xit('should handle fields', () => {
      assert.fail('not implemented');
    });

    xit('should handle subdatasets', () => {
      assert.fail('not implemented');
    });
  });

  xdescribe('IO', () => {
    xit('should handle stdout', () => {
      assert.fail('not implemented');
    });

    xit('should handle file output', () => {
      assert.fail('not implemented');
    });

    xit('should handle connector for output', () => {
      assert.fail('not implemented');
    });
  });
});
