const bookshelf = require('../config/db').bookshelf;

require('./Profile');
require('./Event');
require('./RelationshipProfileCommunity');

const Community = bookshelf.Model.extend({
  tableName: 'communities',
  profiles: function profileFunction() {
    return this.belongsToMany('Profile')
      .through('RelationshipProfileCommunity');
  },
  events: function eventFunction() {
    return this.hasMany('Event', 'community_id');
  },

});

module.exports = bookshelf.model('Community', Community);
