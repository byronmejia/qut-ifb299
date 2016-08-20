module.exports = (bookshelf) => {
  // noinspection Eslint
  const Login = bookshelf.Model.extend({
    tableName: 'logins',
  });
};
