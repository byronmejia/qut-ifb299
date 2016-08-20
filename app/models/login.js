const bcrypt = require('bcrypt');
const Promise = require('bluebird');

module.exports = (bookshelf, passport, LocalStrategy) => {
  /* eslint-disable */
  const Login = bookshelf.Model.extend({
    tableName: 'logins',
    initialize: () => {
      this.on('creating', this.hashPassword, this);
    },
    hashPassword: (model) => new Promise(
      (resolve, reject) => bcrypt.hash(
        model.attributes.password, 10, (err, hash) => {
          if (err) reject(err);
          model.set('password', hash);
          resolve(hash);
        }
      )
    ),
  });
  /* eslint-enable */

  // Set strategies from models
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
};
