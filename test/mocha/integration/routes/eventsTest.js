const describe = require('mocha').describe;
const it = require('mocha').it;
const before = require('mocha').before;
const app = require('../../../../app/server/index').getApp;
const supertest = require('supertest');

const agent = supertest.agent(app);

const account = {
  username: 'admin',
  password: 'password',
};


describe('Integration: Events Router', () => {
  before((done) => {
    agent
      .post('/auth/local')
      .send(account)
      .end((err) => {
        if (err) {
          throw err;
        }
        return done();
      });
  });

  describe('GET', () => {
    it('Will return 200/OK at /', (done) => {
      agent
        .get('/events')
        .expect(200, done);
    });

    it('Will return 200/OK at /:id (1)', (done) => {
      agent
        .get('/events/1')
        .expect(200, done);
    });

    it('Will return 200/OK at /create', (done) => {
      agent
        .get('/events/create')
        .expect(200, done);
    });

    it('Will return 200/OK at /:id/edit', (done) => {
      agent
        .get('/events/1/edit')
        .expect(200, done);
    });
  });
});
