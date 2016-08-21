const path = require('path');
const databaseFile = path.join(__dirname, 'dev.db');

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: databaseFile,
    },
  },

  staging: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: 'knex_migrations',
    },
    pool: {
      min: 0,
      max: 7,
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: 'knex_migrations',
    },
    pool: {
      min: 0,
      max: 7,
    },
  },
};
