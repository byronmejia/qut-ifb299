const path = require('path');
const Strategy = require('passport-local').Strategy;
const Login = require(path.join(__dirname, '..', 'models', 'login.js'));

module.exports = function(passport) {
  passport.use('local', new Strategy({
    usernameField: 'username',
    passwordField: 'password',
  },
  function (username, password, cb) {
    console.log('Doing Strategy');
    Login
      .where({ username: username })
      .fetch()
      .then((data) => {
        console.log(data);
        return cb(null, data);
      });
    }
  ));
};
