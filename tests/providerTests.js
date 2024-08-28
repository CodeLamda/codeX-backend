const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const { expect } = require('chai');

// Unit test for creating a new provider
describe('POST /providers', () => {
  before((done) => {
    mongoose.connect('mongodb://localhost:27017/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => done()).catch((err) => done(err));
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => done());
    });
  });

  it('OK, creating a new provider works', (done) => {
    request(app).post('/providers')
      .send({ name: 'John Doe', email: 'johndoe@example.com', address: '123 Test St' })
      .then((res) => {
        const body = res.body;
        expect(body).to.contain.property('_id');
        expect(body).to.contain.property('name');
        expect(body).to.contain.property('email');
        expect(body).to.contain.property('address');
        done();
      })
      .catch((err) => done(err));
  });

  it('Fail, name, email, and address must be provided', (done) => {
    request(app).post('/providers')
      .send({})
      .then((res) => {
        const body = res.body;
        expect(body.errors.name.name).to.equal('ValidatorError');
        expect(body.errors.name.message).to.equal('Path `name` is required.');
        expect(body.errors.email.name).to.equal('ValidatorError');
        expect(body.errors.email.message).to.equal('Path `email` is required.');
        expect(body.errors.address.name).to.equal('ValidatorError');
        expect(body.errors.address.message).to.equal('Path `address` is required.');
        done();
      })
      .catch((err) => done(err));
  });
});

// Unit test for getting all providers
describe('GET /providers', () => {
  before((done) => {
    mongoose.connect('mongodb://localhost:27017/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => done()).catch((err) => done(err));
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => done());
    });
  });

  it('OK, getting all providers works', (done) => {
    request(app).post('/providers')
      .send({ name: 'John Doe', email: 'johndoe@example.com', address: '123 Test St' })
      .then(() => {
        request(app).get('/providers')
          .then((res) => {
            const body = res.body;
            expect(body).to.be.an('array');
            expect(body.length).to.equal(1);
            expect(body[0]).to.contain.property('_id');
            expect(body[0]).to.contain.property('name');
            expect(body[0]).to.contain.property('email');
            expect(body[0]).to.contain.property('address');
            done();
          })
          .catch((err) => done(err));
      })
      .catch((err) => done(err));
  });
});

// Unit test for getting a provider by id
describe('GET /providers/:id', () => {
  let providerId;

  before((done) => {
    mongoose.connect('mongodb://localhost:27017/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => done()).catch((err) => done(err));
  });

  beforeEach((done) => {
    request(app).post('/providers')
      .send({ name: 'John Doe', email: 'johndoe@example.com', address: '123 Test St' })
      .then((res) => {
        providerId = res.body._id;
        done();
      })
      .catch((err) => done(err));
  });

  afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => done());
  });

  after((done) => {
    mongoose.connection.close(() => done());
  });

  it('OK, getting a provider by id works', (done) => {
    request(app).get(`/providers/${providerId}`)
      .then((res) => {
        const body = res.body;
        expect(body).to.contain.property('_id');
        expect(body).to.contain.property('name');
        expect(body).to.contain.property('email');
        expect(body).to.contain.property('address');
        done();
      })
      .catch((err) => done(err));
  });

  it('Fail, provider not found', (done) => {
    request(app).get('/providers/5f9edf363754245fd93356b9')
      .then((res) => {
        const body = res.body;
        expect(body).to.contain.property('error');
        expect(body.error).to.equal('Provider not found');
        done();
      })
      .catch((err) => done(err));
  });
});

// Unit test for updating a provider
describe('PUT /providers/:id', () => {
  let providerId;

  before((done) => {
    mongoose.connect('mongodb://localhost:27017/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => done()).catch((err) => done(err));
  });

  beforeEach((done) => {
    request(app).post('/providers')
      .send({ name: 'John Doe', email: 'johndoe@example.com', address: '123 Test St' })
      .then((res) => {
        providerId = res.body._id;
        done();
      })
      .catch((err) => done(err));
  });

  afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => done());
  });

  after((done) => {
    mongoose.connection.close(() => done());
  });

  it('OK, updating a provider works', (done) => {
    request(app).put(`/providers/${providerId}`)
      .send({ name: 'Jane Doe', email: 'janedoe@example.com', address: '456 Test St' })
      .then((res) => {
        const body = res.body;
        expect(body).to.contain.property('_id');
        expect(body).to.contain.property('name');
        expect(body).to.contain.property('email');
        expect(body).to.contain.property('address');
        expect(body.name).to.equal('Jane Doe');
        expect(body.email).to.equal('janedoe@example.com');
        expect(body.address).to.equal('456 Test St');
        done();
      })
      .catch((err) => done(err));
  });

  it('Fail, provider not found', (done) => {
    request(app).put('/providers/5f9edf363754245fd93356b9')
      .send({ name: 'Jane Doe', email: 'janedoe@example.com', address: '456 Test St' })
      .then((res) => {
        const body = res.body;
        expect(body).to.contain.property('error');
        expect(body.error).to.equal('Provider not found');
        done();
      })
      .catch((err) => done(err));
  });
});

// Unit test for deleting a provider
describe('DELETE /providers/:id', () => {
  let providerId;

  before((done) => {
    mongoose.connect('mongodb://localhost:27017/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => done()).catch((err) => done(err));
  });

  beforeEach((done) => {
    request(app).post('/providers')
      .send({ name: 'John Doe', email: 'johndoe@example.com', address: '123 Test St' })
      .then((res) => {
        providerId = res.body._id;
        done();
      })
      .catch((err) => done(err));
  });

  afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => done());
  });

  after((done) => {
    mongoose.connection.close(() => done());
  });

  it('OK, deleting a provider works', (done) => {
    request(app).delete(`/providers/${providerId}`)
      .then((res) => {
        const body = res.body;
        expect(body).to.contain.property('_id');
        expect(body).to.contain.property('name');
        expect(body).to.contain.property('email');
        expect(body).to.contain.property('address');
        done();
      })
      .catch((err) => done(err));
  });

  it('Fail, provider not found', (done) => {
    request(app).delete('/providers/5f9edf363754245fd93356b9')
      .then((res) => {
        const body = res.body;
        expect(body).to.contain.property('error');
        expect(body.error).to.equal('Provider not found');
        done();
      })
      .catch((err) => done(err));
  });
});