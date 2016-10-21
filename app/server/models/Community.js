const bookshelf = require('../config/db').bookshelf;

const Profile = require('./Profile');
const Event = require('./Event');
const RelationshipProfileCommunity = require('./RelationshipProfileCommunity');

const Community = bookshelf.Model.extend({
  tableName: 'communities',
  profiles: function profileFunction() {
    return this.belongsToMany(Profile)
      .through(RelationshipProfileCommunity);
  },
  events: function eventFunction() {
    return this.hasMany(Event, 'community_id');
  },

});

module.exports = Community;
