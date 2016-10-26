const bookshelf = require('../config/db').bookshelf;

require('./Profile');
require('./Community');
require('./RelationshipRsvpEventProfile');

const Event = bookshelf.Model.extend({
  tableName: 'events',
  community: function commFunction() {
    return this.belongsTo('Community', 'id');
  },
  profiles: function profileFunction() {
    return this.belongsToMany('Profile')
      .through('RelationshipRsvpEventProfile');
  },
});

module.exports = bookshelf.model('Event', Event);
