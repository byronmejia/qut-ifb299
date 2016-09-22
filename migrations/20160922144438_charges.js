exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.createTable('charges', (t) => {
      t.integer('id').primary();
      t.integer('community_id')
        .unique()
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
