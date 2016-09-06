exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.createTable('rsvp_event_profile_relationship', (t) => {
      t.increments('id');
      t.integer('profile_id')
        .references('id')
        .inTable('profiles')
        .notNullable();
      t.integer('event_id')
        .references('id')
        .inTable('events')
        .notNullable();
      t.integer('rsvp_id')
        .references('id')
        .inTable('rsvp')
        .notNullable();
      t.unique(['profile_id', 'event_id']);
    }),
  ])
);

exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.dropTable('rsvp_event_profile_relationship'),
  ])
);
