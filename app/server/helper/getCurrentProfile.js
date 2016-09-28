const profile = require('../models/Profile');
const jwt = require('../config/jwt');

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
