/**
 * Created by byron on 8/09/16.
 */
const path = require('path');

const Communities = require(path.join('..', 'models', 'Community.js'));
const Relationship = require(
  path.join(__dirname, '..', 'models', 'RelationshipProfileCommunity.js'));

module.exports = (app, passport, jwt, jwtAuth) => {
  app.get('/communities/create', jwtAuth, (req, res) => res.render('create-community'));

  app.get('/communities', jwtAuth, (req, res) => {
    res.render('app/communities');
  });

  app.get('/community/:id', jwtAuth, (req, res) => {
    Communities.where({
      id: req.params.id,
    }).fetch({
      require: true,
    }).then((data) => {
      res.render('app/community-page', {
        community: data.attributes,
      });
    });
  });

  app.post('/community/:id/join', jwtAuth, (req, res) => {
    new Relationship({
      community_id: req.params.id,
      profile_id: 1111,
    }).save().then(() => {
      res.redirect('/communities');
    });
  });

  app.get('/community/:id/edit', jwtAuth, (req, res) => {
    Communities.where({
      id: req.params.id,
    }).fetch({
      require: true,
    }).then((data) => {
      res.render('edit-community', {
        community: data.attributes,
      });
    });
  });

  app.post('/community/:id/edit/success', jwtAuth, (req, res) => {
    Communities.where({
      id: req.params.id,
    }).save({
      name: req.body.community_name,
      profile_picture: null,
      description: req.body.community_desc,
      location: req.body.community_location,
    }, {
      patch: true,
    }).then(() => {
      res.redirect('/communities');
    });
  });

  app.get('/api/communities', jwtAuth, (req, res) => {
    Communities.fetchAll().then((data) =>
      res.json(data)
    );
  });
};
