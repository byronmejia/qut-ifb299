const bookshelf = require('../config/db').bookshelf;

const Profile = require('./Profile');
// const Community = require('./Community');
const RelationshipRsvpEventProfile = require('./RelationshipRsvpEventProfile');

const Event = bookshelf.Model.extend({
  tableName: 'events',
  // community: function commFunction() {
  //   return this.belongsTo(Community, 'id');
  // },
  profiles: function profileFunction() {
    return this.belongsToMany(Profile)
      .through(RelationshipRsvpEventProfile);
  },
});

module.exports = Event;
