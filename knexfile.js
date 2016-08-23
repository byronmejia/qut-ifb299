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
    pool: {
      min: 0,
      max: 7,
    },
    migrations: {
      directory: __dirname + '/migrations',
    },
    seeds: {
      directory: __dirname + '/seeds',
    },
    ssl: true,
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 0,
      max: 7,
    },
    migrations: {
      directory: __dirname+"/migrations"
    },
    seeds: {
      directory: __dirname+"/seeds"
    },
    ssl: true,
  },
};
