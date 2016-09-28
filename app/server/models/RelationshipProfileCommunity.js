const bookshelf = require('../config/db').bookshelf;

const RelationshipProfileCommunity = bookshelf.Model.extend({
  tableName: 'profile_community_relationship',
});

module.exports = RelationshipProfileCommunity;
