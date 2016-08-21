exports.up = (knex, Promise) => (
  Promise.all(
    knex.schema.createTable('logins', (t) => {
      t.increments('id').primary();
      t.string('username');
      t.string('password');
      t.timestamp('lastLogin');
    })
  )
);

exports.down = (knex, Promise) => (
  Promise.all(
    knex.schema.dropTable('logins')
  )
);
