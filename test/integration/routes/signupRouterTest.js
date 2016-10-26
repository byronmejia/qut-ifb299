const describe = require('mocha').describe;
const it = require('mocha').it;
const app = require('../../../app/server/index').getApp;
const supertest = require('supertest');

const agent = supertest.agent(app);

describe('Integration: SignUp Router', () => {
  describe('GET', () => {
    it('Will return 200/OK at /', (done) => {
      agent
        .get('/signup')
        .expect(200, done);
    });
  });
});
