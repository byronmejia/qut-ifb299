const bookshelf = require('../config/db').bookshelf;

const Community = bookshelf.Model.extend({
  tableName: 'communities',
});

module.exports = Community;
