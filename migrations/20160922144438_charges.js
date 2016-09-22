exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.createTable('charges', (t) => {
      t.string('id').primary();
      t.integer('community_id')
        .references('id')
        .inTable('communities')
        .notNullable();
    }),
  ])
);

exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.dropTable('charges'),
  ])
);
