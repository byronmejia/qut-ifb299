const path = require('path');

const knexPath = path.join(__dirname, '..', '..', '..', 'knexfile');
const knexFile = require(knexPath);
const knex = require('knex')(knexFile[process.env.NODE_ENV || 'development']);
const bookshelf = require('bookshelf')(knex);

module.exports.knex = knex;
module.exports.bookshelf = bookshelf;
