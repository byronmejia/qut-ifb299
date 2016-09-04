/**
 * Created by byron on 4/09/16.
 */
const path = require('path');

const bookshelf = require(path.join('..', 'config', 'db.js')).bookshelf;

const Location = bookshelf.Model.extend({
    tableName: 'locations',
});

module.exports = Location;
