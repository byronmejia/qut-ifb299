const fs = require('fs');
const path = require('path');
const jwt = require('jwt-simple');

const secret = process.env.SECRET_KEY || fs.readFileSync(
  path.join(__dirname, 'secret.key'),
  'utf8'
);

function encode(payload) {
  return jwt.encode(payload, secret, 'HS512');
}

function decode(payload) {
  return jwt.decode(payload, secret, 'HS512');
}

module.exports.encode = encode;
module.exports.decode = decode;
module.exports.auth = (passport) =>
passport.authenticate('jwt', { session: false, failureRedirect: '/login' });
