const bcrypt = require('bcrypt');
const Promise = require('bluebird');
const bookshelf = require('../config/db').bookshelf;

const Login = bookshelf.Model.extend({
  tableName: 'logins',
  initialize: function onCreate() {
    this.on('creating', this.hashPassword, this);
  },
  hashPassword: model => new Promise(
    (resolve, reject) => bcrypt.hash(
      model.attributes.password, 10, (err, hash) => {
        if (err) reject(err);
        model.set('password', hash);
        resolve(hash);
      }
    )
  ),
});

module.exports = Login;
