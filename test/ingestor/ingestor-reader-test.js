var assert = require('assert');

var util = require('../../ingestor/ingest-util');

describe('Reader', () => {
  describe('Init', () => {
    it('should exist', () => {
      assert.ok(util.reader);
    });

    it('should take type and source', () => {
      assert.ok(util.reader.new('type', 'source'));
    });
  });

  xdescribe('Params', () => {
    var reader;
    var type;
    var source;

    xdescribe('File', () => {
      beforeEach(() => {
        type = 'file';
      });

      xdescribe('CSV', () => {
        xit('should handle a CSV File', () => {
          source = 'file.csv';
          reader = util.reader.new(type, source);

          assert.fail('not implemented');
        });
      });

      xdescribe('JSON', () => {
        xit('should handle a JSON File', () => {
          source = 'file.json';
          reader = util.reader.new(type, source);

          assert.fail('not implemented');
        });
      });
    });

    xdescribe('HTTP', () => {
      beforeEach(() => {
        type = 'http';
      });

      xit('should handle HTTP', () => {
        source = 'http://example.com/data.json';

        assert.fail('not implemented');
      });
    });
  });

  xdescribe('IO', () => {
    xit('should generate io', () => {
      assert.fail('not implemented');
    });
  });
});
