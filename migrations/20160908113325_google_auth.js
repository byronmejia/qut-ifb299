exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.createTable('google_auth', (t) => {
      t.string('id').primary();
      t.integer('login_id')
        .unique()
        .references('id')
        .inTable('logins')
        .notNullable();
    }),
  ])
);

exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.dropTable('google_auth'),
  ])
);
