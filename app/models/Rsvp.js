/**
 * Created by byron on 4/09/16.
 */
const path = require('path');

const bookshelf = require(path.join('..', 'config', 'db.js')).bookshelf;

const Rsvp = bookshelf.Model.extend({
  tableName: 'rsvp',
});

module.exports = Rsvp;
