/**
 * Created by byron on 22/9/16.
 */
const path = require('path');

const profile = require(path.join('..', 'models', 'Profile.js'));
const jwt = require(path.join('..', 'config', 'jwt.js'));

module.exports = function getCurrentProfile(req) {
  return profile
    .where({ login_id: jwt.decode(req.cookies.authToken).user })
    .fetch()
    .then((data) => {
      if (!data) {
        return null;
      }
      return data.attributes.id;
    });
};
