exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('profiles', function(table) {
      table.string('notifications');
    })
  ])
};

exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.dropTable('profiles'),
  ])
);