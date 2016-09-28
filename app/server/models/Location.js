const bookshelf = require('../config/db').bookshelf;

const Location = bookshelf.Model.extend({
  tableName: 'locations',
});

module.exports = Location;
