const { expect } = require('chai');
const sinon = require('sinon');

const { IngestManager } = require('../../utils/ingestmanager');

const configDir = "test/fixtures/";

describe('IngestManager', () => {

  describe('Init', () => {
    let readerStub;

    afterEach(() => {
      if (readerStub && readerStub.restore) readerStub.restore();
    });

    it('should exist', () => {
      expect(IngestManager).to.be.ok;
    });

    it('checks params', () => {
      let missingParams = sinon.spy();
      let missingLocation = sinon.spy();
      let missingType = sinon.spy();
      let missingRoot = sinon.spy();

      try {
        new IngestManager();
      }
      catch(err) {
        missingParams();
      }

      try {
        new IngestManager({
          type: '123'
        });
      }
      catch(err) {
        missingLocation();
      }

      try {
        new IngestManager({
          location: 'file'
        });
      }
      catch(err) {
        missingType();
      }

      try {
        new IngestManager({
          location: 'file.json',
          type: 'csv',
          root: 'root'
        });
      }
      catch(err) {
        console.log("Err:", err);
        missingRoot();
      }

      expect(missingParams.called).to.be.true;
      expect(missingLocation.called).to.be.true;
      expect(missingType.called).to.be.true;
      expect(missingRoot.called).to.be.true;
    });
  });
});
