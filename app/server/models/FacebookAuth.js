const path = require('path');

const bookshelf = require(path.join('..', 'config', 'db.js')).bookshelf;

const Login = bookshelf.Model.extend({
  tableName: 'facebook_auth',
});

module.exports = Login;
