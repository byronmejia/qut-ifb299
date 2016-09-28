const bookshelf = require('../config/db').bookshelf;

const Profile = bookshelf.Model.extend({
  tableName: 'profiles',
});

module.exports = Profile;
