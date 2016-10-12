exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.table('communities', (t) => {
      t.decimal('currentAmount')
        .defaultTo(0.00);
    }),
  ])
);

exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.table('communities', (t) => {
      t.dropColumn('currentAmount');
    }),
  ])
);
