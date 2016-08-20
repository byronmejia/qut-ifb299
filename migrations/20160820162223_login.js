exports.up = (knex, Promise) => (
  Promise.all(
    knex.schema.createTable('logins', () => {
      /* eslint-disable */
      table.increment('id').primary();
      table.string('username');
      /* eslint-enable */
    })
  )
);

exports.down = (knex, Promise) => (
  Promise.all(
    knex.schema.dropTable('logins')
  )
);
