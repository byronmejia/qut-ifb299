exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.createTable('locations', (t) => {
      t.increments('id');
      t.decimal('lat', 9, 6)
        .notNullable();
      t.decimal('lon', 9, 6)
        .notNullable();
      t.string('locationName')
        .notNullable();
      t.unique(['lat', 'lon', 'locationName']);
    })
  ])
);

exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.dropTable('locations'),
  ])
);
