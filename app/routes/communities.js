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

  app.get('/communities/:id/donate', jwtAuth, (req, res) => {
    Communities.where({ id: req.params.id }).fetch()
      .then((data) => {
        res.render('app/communities/donate', { community: data });
      });
  });

  app.post('/communities/:id/donate', jwtAuth, (req, res) => {
    // Do something
  });
};
