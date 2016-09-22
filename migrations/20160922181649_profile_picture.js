exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.table('profiles', (t) => {
      t.string('profile_picture');
    }),
  ])
);

exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.table('profiles', (t) => {
      t.dropColumn('profile_picture');
    }),
  ])
);
