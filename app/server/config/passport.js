const bcrypt = require('bcrypt');

const Strategy = require('passport-local').Strategy;
const CustomStrategy = require('passport-custom').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

let keys;

try {
  keys = require('./keys.json'); // eslint-disable-line
} catch (err) {
  console.log(err); // eslint-disable-line no-console
  keys = {
    facebook: {
      id: process.env.FB_ID,
      secret: process.env.FB_SEC,
    },
    github: {
      id: process.env.GH_ID,
      secret: process.env.GH_SEC,
    },
    google: {
      id: process.env.G_ID,
      secret: process.env.G_SEC,
    },
  };
}

const Login = require('../models/Login');
const FacebookAuth = require('../models/FacebookAuth');
const GitHubAuth = require('../models/GitHubAuth');
const GoogleAuth = require('../models/GoogleAuth');
const JWT = require('./jwt');

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

  passport.use('github', new GitHubStrategy({
    clientID: keys.github.id,
    clientSecret: keys.github.secret,
    callbackURL: 'http://localhost:3000/auth/callback/github',
  },
    (accessToken, refreshToken, profile, cb) =>
      GitHubAuth
        .where({ id: profile.id })
        .fetch()
        .then((data) => {
          if (!data) return cb(null, false);
          return cb(null, data);
        })
  ));

  passport.use('github_link', new GitHubStrategy({
    clientID: keys.github.id,
    clientSecret: keys.github.secret,
    callbackURL: 'http://localhost:3000/auth/callback/github/new',
  },
    (accessToken, refreshToken, profile, cb) =>
      cb(null, GitHubAuth.forge({ id: profile.id }))
  ));

  passport.use('google', new GoogleStrategy({
    clientID: keys.google.id,
    clientSecret: keys.google.secret,
    callbackURL: 'http://localhost:3000/auth/callback/google',
    authorizationURL: keys.google.auth_uri,
    tokenURL: keys.google.token_uri,
  },
    (accessToken, refreshToken, profile, cb) =>
      GoogleAuth
        .where({ id: profile.id })
        .fetch()
        .then((data) => {
          if (!data) return cb(null, false);
          return cb(null, data);
        })
  ));

  passport.use('google_link', new GoogleStrategy({
    clientID: keys.google.id,
    clientSecret: keys.google.secret,
    callbackURL: 'http://localhost:3000/auth/callback/google/new',
    authorizationURL: keys.google.auth_uri,
    tokenURL: keys.google.token_uri,
  },
    (accessToken, refreshToken, profile, cb) =>
      cb(null, GoogleAuth.forge({ id: profile.id }))
  ));
};
