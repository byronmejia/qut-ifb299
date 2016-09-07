const path = require('path');
const bcrypt = require('bcrypt');

const Strategy = require('passport-local').Strategy;
const CustomStrategy = require('passport-custom').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const keys = require('./keys.json');

const Login = require(path.join(__dirname, '..', 'models', 'Login.js'));
const FacebookAuth = require(path.join(__dirname, '..', 'models', 'FacebookAuth.js'));
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
      let decoded = '';
      try {
        decoded = JWT.decode(req.cookies.authToken);
      } catch (e) {
        decoded = false;
      }
      if (!decoded) return cb(null, false);
      if (((new Date()).getTime()) > decoded.ttl) return cb(null, false);
      return cb(null, decoded);
    }
  ));

  passport.use('facebook', new FacebookStrategy({
    clientID: keys.facebook.id,
    clientSecret: keys.facebook.secret,
    callbackURL: 'http://localhost:3000/auth/callback/facebook',
  },
  (accessToken, refreshToken, profile, cb) =>
    FacebookAuth
      .where({ id: profile.id })
      .fetch()
      .then((data) => {
        if (!data) return cb(null, false);
        return cb(null, data);
      })
  ));

  passport.use('facebook_link', new FacebookStrategy({
    clientID: keys.facebook.id,
    clientSecret: keys.facebook.secret,
    callbackURL: 'http://localhost:3000/auth/callback/facebook/new',
  },
  (accessToken, refreshToken, profile, cb) =>
    cb(null, FacebookAuth.forge({ id: profile.id }))
  ));
};

