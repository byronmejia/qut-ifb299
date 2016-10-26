const bookshelf = require('../config/db').bookshelf;

require('./Community');
require('./Event');
require('./RelationshipProfileCommunity');
require('./RelationshipRsvpEventProfile');

const Profile = bookshelf.Model.extend({
  tableName: 'profiles',
  communities: function communityFunction() {
    return this.belongsToMany('Community')
      .through('RelationshipProfileCommunity');
  },
  events: function eventFunction() {
    return this.belongsToMany('Event')
    .through('RelationshipRsvpEventProfile');
  },
});

module.exports = bookshelf.model('Profile', Profile);
