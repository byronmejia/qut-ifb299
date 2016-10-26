const bookshelf = require('../config/db').bookshelf;

const Charges = bookshelf.Model.extend({
  tableName: 'charges',
});

module.exports = bookshelf.model('Charges', Charges);
