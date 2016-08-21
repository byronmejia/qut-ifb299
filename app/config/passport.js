const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Login = require(path.join('..', 'models', 'login.js'));

// Set Local Strategy
passport.use(new LocalStrategy(
  (username, password, done) => Login.findOne(
    { username }, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false);
      if (!user.validPassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    })
));

exports.passport = passport;
exports.LocalStrategy = LocalStrategy;
