const path = require('path');
const bcrypt = require('bcrypt');
const Strategy = require('passport-local').Strategy;
const CustomStrategy = require('passport-custom').Strategy;
const Login = require(path.join(__dirname, '..', 'models', 'login.js'));
const JWT = require(path.join(__dirname, 'jwt.js'));

const isValidPassword = function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.attributes.password);
};

module.exports = function loadPassport(passport) {
  passport.use('local', new Strategy({
    usernameField: 'username',
    passwordField: 'password',
  },
  (username, password, cb) => Login
    .where({ username })
    .fetch()
    .then((data) => {
      if (!data) return cb(null, false);
      if (!isValidPassword(data, password)) return cb(null, false);
      return cb(null, data);
    })
  ));

  passport.use('jwt', new CustomStrategy(
    (req, cb) => {
      if (req.cookies.authToken === '') return cb(null, false);
      const decoded = JWT.decode(req.cookies.authToken);
      if (((new Date).getTime()) > decoded.ttl) return cb(null, false);
      return cb(null, decoded);
    }
  ));
};

