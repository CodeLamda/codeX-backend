Here is the updated code with added unit tests:

const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Provider = mongoose.model('Provider', providerSchema);

module.exports = Provider;

// Unit tests
const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');

const Provider = require('../src/models/providerModel');

describe('Provider Model', () => {
  describe('#save()', () => {
    it('should save a provider', async () => {
      const providerData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        address: '123 Street, City, State',
      };
      const spy = sinon.spy();
      const provider = new Provider(providerData);
      sinon.stub(mongoose.Model.prototype, 'save').callsFake(spy);

      await provider.save();

      expect(spy.calledOnce).to.be.true;
      expect(spy.calledWith(providerData)).to.be.true;
    });

    it('should throw an error if required fields are missing', async () => {
      const providerData = {}; // Empty data to trigger required fields error
      const provider = new Provider(providerData);

      try {
        await provider.save();
      } catch (error) {
        expect(error.errors.name).to.exist;
        expect(error.errors.email).to.exist;
        expect(error.errors.phone).to.exist;
        expect(error.errors.address).to.exist;
      }
    });
  });
});