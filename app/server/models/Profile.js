const bookshelf = require('../config/db').bookshelf;

const Community = require('./Community');
const Event = require('./Event');
const RelationshipProfileCommunity = require('./RelationshipProfileCommunity');
const RelationshipRsvpEventProfile = require('./RelationshipRsvpEventProfile');

const Profile = bookshelf.Model.extend({
  tableName: 'profiles',
  communities: function communityFunction() {
    return this.belongsToMany(Community)
      .through(RelationshipProfileCommunity);
  },
  events: function eventFunction() {
    return this.belongsToMany(Event)
    .through(RelationshipRsvpEventProfile);
  },
});

module.exports = Profile;
