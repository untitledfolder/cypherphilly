const assert = require('assert');

const util = require('../../utils/cypher-util');

describe('Neo Util', () => {
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

    it('handles no varname and one label as a string', () => {
      var varname = '';
      var labels = 'Label';

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

    it('handles single quote', () => {
      var mapped = {one: 'item', two: 'items', quote: 'has\'quote'};
      var output = "{one: 'item', two: 'items', quote: 'has\\'quote'}";

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

  describe('Generate CREATE', () => {
    it('uses the generated label and map', () => {
      var varname = 'n';
      var labels = ['Label1', 'Label2', 'Label3'];
      var mapped = {one: 'item', two: 'items'};

      var output = "CREATE (n :Label1:Label2:Label3 {one: 'item', two: 'items'})";

      assert.equal(util.genCREATE(varname, labels, mapped), output);
    });
  });

  describe('Generate MERGE', () => {
    it('uses the generated label, matcher, and map', () => {
      var varname = 'n';
      var labels = ['Label1', 'Label2', 'Label3'];
      var mapped = {one: 'item', two: 'items'};

      var output = "MERGE (n :Label1:Label2:Label3 {one: 'item', two: 'items'})";

      assert.equal(util.genMERGE(varname, labels, mapped), output);
    });
  });

  describe('Generate SET list', () => {
    it('takes a var, id, and map that is just id', () => {
      var varname = 'n';
      var id = 'id';
      var mapped = {id: '123'};

      var output = "";

      assert.equal(util.genSET(varname, id, mapped), output);
    });

    it('takes a var, id, and map with one more than id', () => {
      var varname = 'n';
      var id = 'id';
      var mapped = {id: '123', one: 'item'};

      var output = "\nSET n.one = 'item';";

      assert.equal(util.genSET(varname, id, mapped), output);
    });

    it('takes a var, id, and map with multiple fields', () => {
      var varname = 'n';
      var id = 'id';
      var mapped = {id: '123', one: 'item', two: 'items'};

      var output = "\nSET n.one = 'item', n.two = 'items';";

      assert.equal(util.genSET(varname, id, mapped), output);
    });

    it('handles single quote', () => {
      var varname = 'n';
      var id = 'id';
      var mapped = {id: '123', one: 'item', num: 3, two: 'items', quote: 'has\'quote'};

      var output = "\nSET n.one = 'item', n.num = 3, n.two = 'items', n.quote = 'has\\'quote';";

      assert.equal(util.genSET(varname, id, mapped), output);
    });
  });

  describe('Generate create_or_update', () => {
    it('uses the appropriate pattern', () => {
      var labels = ['Label1', 'Label2', 'Label3'];
      var id = 'id';
      var mapped = {id: '123', one: 'item', two: 'items'};

      var output = "MERGE (n :Label1:Label2:Label3 {id: '123'})";
      output += "\nSET n.one = 'item', n.two = 'items';";

      assert.equal(util.genCreateOrUpdate(labels, id, mapped), output);
    });
  });

  xdescribe('Create writer', () => {
    it('uses id, labels, and a stream', () => {
      assert.fail("Not implemented");
    });

    it('knows when to stop', () => {
      assert.fail("Not implemented");
    });
  });
});
