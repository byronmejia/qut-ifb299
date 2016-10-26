const bookshelf = require('../config/db').bookshelf;

const RelationshipRsvpEventProfile = bookshelf.Model.extend({
  tableName: 'rsvp_event_profile_relationship',
});

module.exports = bookshelf.model('RelationshipRsvpEventProfile', RelationshipRsvpEventProfile);
