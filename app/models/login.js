const bcrypt = require('bcrypt');
const path = require('path');
const Promise = require('bluebird');
const bookshelf = require(path.join('..', 'config', 'db.js')).bookshelf;

const Login = bookshelf.Model.extend({
  tableName: 'logins',
  initialize: function() {
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

module.exports = Login;
