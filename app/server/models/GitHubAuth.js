const bookshelf = require('../config/db').bookshelf;

const Login = bookshelf.Model.extend({
  tableName: 'github_auth',
});

module.exports = Login;
