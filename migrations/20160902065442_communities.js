exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.createTable('communities', (t) => {
      t.increments('id');
      t.string('name').unique().notNullable();
      t.string('profile_picture');
      t.string('description');
      t.string('location');
    }),
  ])
);

exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.dropTable('communities'),
  ])
);
