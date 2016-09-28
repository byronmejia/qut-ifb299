const bookshelf = require('../config/db').bookshelf;

const Login = bookshelf.Model.extend({
  tableName: 'facebook_auth',
});

module.exports = Login;
