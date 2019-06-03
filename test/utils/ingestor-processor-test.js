var assert = require('assert');

var util = require('../../utils/ingest-util');

describe('Processor', () => {
  describe('Init', () => {
    it('should exist', () => {
      assert.ok(util.processor);
    });

    it('should take type, fields, and io', () => {
      assert.ok(util.processor.new('type', 'fields', 'io'));
    });
  });

  xdescribe('Params', () => {
    xit('should use correct type for processing', () => {
      assert.fail('not implemented');
    });

    xit('should use fields correctly', () => {
      assert.fail('not implemented');
    });

    xit('should process io properly', () => {
      assert.fail('not implemented');
    });
  });

  xdescribe('IO', () => {
    xit('should send one processed object at a time', () => {
      assert.fail('not implemented');
    });
  });
});
