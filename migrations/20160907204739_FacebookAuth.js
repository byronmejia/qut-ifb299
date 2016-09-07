exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.createTable('facebook_auth', (t) => {
      t.integer('id').primary();
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
    knex.schema.dropTable('facebook_auth'),
  ])
);
