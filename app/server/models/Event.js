const bookshelf = require('../config/db').bookshelf;

const Event = bookshelf.Model.extend({
  tableName: 'events',
});

module.exports = Event;
