const bookshelf = require('../config/db').bookshelf;

const Rsvp = bookshelf.Model.extend({
  tableName: 'rsvp',
});

module.exports = bookshelf.model('Rsvp', Rsvp);
