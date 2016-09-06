exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.createTable('profiles', (t) => {
      t.increments('id')
        .primary();
      t.string('firstName')
        .notNullable();
      t.string('lastName');
      t.string('email')
        .unique()
        .notNullable();
      t.string('mobile')
        .unique();
      t.text('bio');
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
    knex.schema.dropTable('profiles'),
  ])
);
