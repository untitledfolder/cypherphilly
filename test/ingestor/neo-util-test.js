const assert = require('assert');

const util = require('../../ingestor/neo-util');

describe.only('Neo Util', () => {
  describe('Generate Labels', () => {
    it('takes no variable name and no labels', () => {
      var varname = '';
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

  describe('Generate map', () => {
    it('maps out a map with one', () => {
      var mapped = {one: 'item'};
      var output = "{one: 'item'}";

      assert.equal(util.genMap(mapped), output);
    });

    it('maps out a map with multi', () => {
      var mapped = {one: 'item', two: 'items'};
      var output = "{one: 'item', two: 'items'}";

      assert.equal(util.genMap(mapped), output);
    });
  });

  describe('Generate MATCH', () => {
    it('uses the generated label and matcher', () => {
      var varname = 'n';
      var labels = ['Label1', 'Label2', 'Label3'];
      var mapped = {one: 'item', two: 'items'};

      var output = "MATCH (n :Label1:Label2:Label3 {one: 'item', two: 'items'})";

      assert.equal(util.genMATCH(varname, labels, mapped), output);
    });
  });

  describe.only('Generate CREATE', () => {
    it('uses the generated label and map', () => {
      var varname = 'n';
      var labels = ['Label1', 'Label2', 'Label3'];
      var mapped = {one: 'item', two: 'items'};

      var output = "CREATE (n :Label1:Label2:Label3 {one: 'item', two: 'items'})";

      assert.equal(util.genCREATE(varname, labels, mapped), output);
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
