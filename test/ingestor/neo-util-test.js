const assert = require('assert');

const util = require('../../ingestor/neo-util');

describe.only('Neo Util', () => {
  describe.only('Generate Labels', () => {
    it('takes no variable name and no labels', () => {
      var varname = 'n';
      var labels = [];

      var output = '()';

      assert.equal(util.genLabel(varname, labels), output);
    });

    it('takes variable name and no labels', () => {
      var varname = 'n';
      var labels = [];

      var output = '(n)';

      assert.equal(util.genLabel(varname, labels), output);
    });

    it('handles no varname and one label', () => {
      var varname = '';
      var labels = ['Label'];

      var output = '(:Label)';

      assert.equal(util.genLabel(varname, labels), output);
    });

    it('handles varname and one label', () => {
      var varname = 'n';
      var labels = ['Label'];

      var output = '(n :Label)';

      assert.equal(util.genLabel(varname, labels), output);
    });

    it('handles multiple labels', () => {
      var varname = 'n';
      var labels = ['Label1', 'Label2', 'Label3'];

      var output = '(n :Label1:Label2:Label3)';

      assert.equal(util.genLabel(varname, labels), output);
    });
  });

  describe('Generate matcher', () => {
    it('uses one field', () => {
      assert.fail('Not implemented');
    });

    it('uses multiple fields', () => {
      assert.fail('Not implemented');
    });
  });

  describe('Generate set map', () => {
    it('maps out a map', () => {
      assert.fail('Not implemented');
    });
  });

  describe('Generate MATCH', () => {
    it('uses the generated label and matcher', () => {
      assert.fail('Not implemented');
    });
  });

  describe('Generate CREATE', () => {
    it('uses the generated label and map', () => {
      assert.fail('Not implemented');
    });
  });

  describe('Generate UPDATE', () => {
    it('uses the generated MATCH and map', () => {
      assert.fail('Not implemented');
    });
  });

  describe('Generate MERGE', () => {
    it('uses the generated label, matcher, and map', () => {
      assert.fail('Not implemented');
    });
  });

  describe('Generate create_or_update', () => {
    it('uses the appropriate pattern', () => {
      assert.fail('Not implemented');
    });
  });
});
