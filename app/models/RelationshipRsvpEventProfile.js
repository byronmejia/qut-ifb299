/**
 * Created by byron on 4/09/16.
 */
const path = require('path');

const bookshelf = require(path.join('..', 'config', 'db.js')).bookshelf;

const RelationshipRsvpEventProfile = bookshelf.Model.extend({
    tableName: 'rsvp_event_profile_relationship',
});

module.exports = RelationshipRsvpEventProfile;
