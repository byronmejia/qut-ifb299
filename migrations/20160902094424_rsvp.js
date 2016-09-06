exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.createTable('rsvp', (t) => {
      t.increments('id');
      t.string('state')
        .notNullable()
        .unique();
    }),
  ])
);

exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.dropTable('rsvp'),
  ])
);
