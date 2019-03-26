var assert = require('assert');

var util = require('../../ingestor/ingest-util');

describe('Writer', () => {
  describe('Init', () => {
    it('should exist', () => {
      assert.ok(util.writer);
    });

    it('should take output and processed io', () => {
      assert.ok(util.writer.new('processedio', 'output'));
    });
  });

  xdescribe('Params', () => {
    xit('should handle processedio', () => {
      assert.fail('not implemented');
    });

    xit('should handle output', () => {
      assert.fail('not implemented');
    });
  });

  xdescribe('IO', () => {
    xit('should output pp', () => {
      assert.fail('not implemented');
    });

    xit('should output JSON', () => {
      assert.fail('not implemented');
    });

    xit('should output CSV', () => {
      assert.fail('not implemented');
    });

    xit('should handle upload to Neo', () => {
      assert.fail('not implemented');
    });
  });
});
