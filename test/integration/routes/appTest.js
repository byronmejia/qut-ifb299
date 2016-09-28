const describe = require('mocha').describe;
const it = require('mocha').it;
const request = require('supertest');
const app = require('../../../app/server/index').getApp;

describe('GET /profile', () => {
  it('Fails when not authenticated', (done) => {
    request(app)
      .get('/profile')
      .expect(302, done);
  });

  it('Will return 200/OK after authenticated', (done) => {
    request(app)
      .get('/profile')
      .expect(302, done);
  });
});

describe('GET /home', () => {
  it('Fails when not authenticated', (done) => {
    request(app)
      .get('/home')
      .expect(302, done);
  });

  it('Will return 200/OK after authenticated', (done) => {
    request(app)
      .get('/home')
      .expect(302, done);
  });
});

describe('GET /dashboard', () => {
  it('Fails when not authenticated', (done) => {
    request(app)
      .get('/dashboard')
      .expect(302, done);
  });

  it('Will return 200/OK after authenticated', (done) => {
    request(app)
      .get('/dashboard')
      .expect(302, done);
  });
});
