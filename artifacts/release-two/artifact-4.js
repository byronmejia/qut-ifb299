exports.up = (knex, Promise) => (
    Promise.all([
        knex.schema.table('profiles', (t) => {
            t.string('notifications');
}),
])
);

exports.down = (knex, Promise) => (
    Promise.all([
        knex.schema.table('profiles', (t) => {
            t.dropColumn('notifications');
}),
])
);
