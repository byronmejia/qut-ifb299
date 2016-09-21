exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.createTable('logins', (t) => {
      t.increments('id').primary();
      t.string('username')
        .unique()
        .notNullable();
      t.string('password')
        .notNullable();
      t.timestamp('lastLogin');
    }),
  ])
);

exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.dropTable('logins'),
  ])
);
