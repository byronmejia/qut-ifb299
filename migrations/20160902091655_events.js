exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.createTable('events', (t) => {
      t.increments('id');
      t.string('name')
        .notNullable();
      t.text('description');
      t.timestamp('startTime')
        .notNullable();
      t.timestamp('endTime');
      t.integer('location_id')
        .notNullable()
        .references('id')
        .inTable('locations');
    }),
  ])
);

exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.dropTable('events'),
  ])
);
