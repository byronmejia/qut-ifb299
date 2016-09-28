const describe = require('mocha').describe;
const it = require('mocha').it;
const request = require('supertest');
const app = require('../../../app/server/index').getApp;

describe('GET /', () => {
  it('Will return 200/OK after authenticated', (done) => {
    request(app)
      .get('/')
      .expect(200, done);
  });
});
