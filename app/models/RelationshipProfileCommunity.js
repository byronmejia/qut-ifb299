/**
 * Created by byron on 4/09/16.
 */
const path = require('path');

const bookshelf = require(path.join('..', 'config', 'db.js')).bookshelf;

const RelationshipProfileCommunity = bookshelf.Model.extend({
  tableName: 'profile_community_relationship',
});

module.exports = RelationshipProfileCommunity;
