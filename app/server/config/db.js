const ENV = process.env.NODE_ENV || 'development';

const knexFile = require('../../../knexfile');
const knex = require('knex')(knexFile[ENV]);
const bookshelf = require('bookshelf')(knex);

module.exports.knex = knex;
module.exports.bookshelf = bookshelf;
