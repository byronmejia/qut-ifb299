/**
 * Created by byron on 4/09/16.
 */
const path = require('path');

const bookshelf = require(path.join('..', 'config', 'db.js')).bookshelf;

const Profile = bookshelf.Model.extend({
  tableName: 'profiles',
});

const getProfileByUserId = function getProfileByUserId(err, id, cb) {
  Profile.where({
    user_id: id,
  }).fetch({
    require: true,
  }).then((data) => {
    cb(data.profile_id);
  });
};

module.exports = Profile;
module.exports = getProfileByUserId;
