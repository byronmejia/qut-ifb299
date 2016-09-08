/**
 * Created by byron on 8/09/16.
 */
const path = require('path');
const Communities = require(path.join('..', 'models', 'Community.js'));

module.exports = (app, passport, jwt, jwtAuth) => {
  app.get('/communities', jwtAuth, (req, res) => {
    res.render('app/communities');
  });

  app.get('/api/communities', jwtAuth, (req, res) => {
    Communities.fetchAll().then((data) =>
      res.json(data)
    );
  });
};
