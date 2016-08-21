const path = require('path');
const bcrypt = require('bcrypt');
const Strategy = require('passport-local').Strategy;
const Login = require(path.join(__dirname, '..', 'models', 'login.js'));

const isValidPassword = function (user, password) {
  return bcrypt.compareSync(password, user.attributes.password);
};

module.exports = function (passport) {
  passport.use('local', new Strategy({
    usernameField: 'username',
    passwordField: 'password',
  },
  function (username, password, cb) {
    Login
      .where({ username })
      .fetch()
      .then((data) => {
        if (!data.attributes.username) return cb(null, false);
        if (!isValidPassword(data, password)) return cb(null, false);
        return cb(null, data);
      });
    }
  ));
};
