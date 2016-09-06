exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.createTable('profile_community_relationship', (t) => {
      t.increments('id');
      t.integer('profile_id')
        .references('id')
        .inTable('profiles')
        .notNullable();
      t.integer('community_id')
        .references('id')
        .inTable('communities')
        .notNullable();
      t.unique(['profile_id', 'community_id']);
    }),
  ])
);

exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.dropTable('profile_community_relationship'),
  ])
);
