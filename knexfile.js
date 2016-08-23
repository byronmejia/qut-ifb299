const path = require('path');
const databaseFile = path.join(__dirname, 'dev.db');
const migrations = {
  migrations: path.join(__dirname, '/migrations'),
  seeds: path.join(__dirname, '/seeds'),
};

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: databaseFile,
    },
  },

  staging: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: migrations.migrations,
    },
    seeds: {
      directory: migrations.seeds,
    },
    ssl: true,
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: migrations.migrations,
    },
    seeds: {
      directory: migrations.seeds,
    },
    ssl: false,
  },
};
