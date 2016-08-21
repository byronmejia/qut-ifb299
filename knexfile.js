module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.db',
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
