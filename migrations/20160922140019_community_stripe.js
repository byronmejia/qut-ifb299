exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.table('communities', (t) => {
      t.decimal('currentAmount');
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
