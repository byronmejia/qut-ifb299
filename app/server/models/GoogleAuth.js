const bookshelf = require('../config/db').bookshelf;

const Login = bookshelf.Model.extend({
  tableName: 'google_auth',
});

module.exports = Login;
