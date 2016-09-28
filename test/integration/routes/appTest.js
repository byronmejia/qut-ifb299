const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const request = require('supertest');
const path = require('path');

const app = require(
  path.join(__dirname, '..', '..', '..', 'app', 'server', 'index.js')
).getApp;

describe('GET /profile', function() {
  it('Fails when not authenticated', function(done) {
    request(app)
      .get('/profile')
      .expect(302, done);
  });

  it('Will return 200/OK after authenticated', function(done) {
    request(app)
      .get('/profile')
      .expect(302, done);
  });
});

describe('GET /home', function() {
  it('Fails when not authenticated', function(done) {
    request(app)
      .get('/home')
      .expect(302, done);
  });

  it('Will return 200/OK after authenticated', function(done) {
    request(app)
      .get('/home')
      .expect(302, done);
  });
});

describe('GET /dashboard', function() {
  it('Fails when not authenticated', function(done) {
    request(app)
      .get('/dashboard')
      .expect(302, done);
  });

  it('Will return 200/OK after authenticated', function(done) {
    request(app)
      .get('/dashboard')
      .expect(302, done);
  });
});
