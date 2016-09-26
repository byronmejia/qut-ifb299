/**
 * Created by byron on 21/08/2016.
 */
const path = require('path');

module.exports = {
  app: path.join(__dirname, 'app.js'),
  db: path.join(__dirname, 'db.js'),
  passport: path.join(__dirname, 'passport.js'),
  jwt: path.join(__dirname, 'jwt.js'),
};
