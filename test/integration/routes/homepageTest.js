const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const request = require('supertest');
const path = require('path');

const app = require(
  path.join(__dirname, '..', '..', '..', 'app', 'server', 'index.js')
).getApp;

describe('GET /', function() {
  it('Will return 200/OK after authenticated', function(done) {
    request(app)
      .get('/')
      .expect(200, done);
  });
});
