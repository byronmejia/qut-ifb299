/**
 * Created by byron on 8/09/16.
 */
const path = require('path');

const Communities = require(path.join('..', 'models', 'Community.js'));
const Profile = require(path.join('..', 'models', 'Profile.js'));
const Relationship = require(
  path.join(__dirname, '..', 'models', 'RelationshipProfileCommunity.js'));

module.exports = (app, passport, jwt, jwtAuth) => {
  app.get('/communities/create', jwtAuth, (req, res) => res.render('create-community'));
};

module.exports = (app, passport, jwt, jwtAuth) => {
  app.get('/communities', jwtAuth, (req, res) => {
    res.render('app/communities');
  });

  // app.get('/communities/:name', jwtAuth, (req, res) => {
  //
  // });

  app.get('/communities/:id/edit', jwtAuth, (req, res) => {
    Profile.getProfileByUserId(null, req.user.id, (profileId) => {
      Relationship.where({
        community_id: req.params.id,
        profile_id: profileId,
      }).fetch({
        require: true,
      }).then((data) => {
        if (!data.isEmpty()) {
          res.render('app/community-page', {
            fields: data,
          });
        } else {
          res.send('You do not have permission to view this page');
        }
      });
    });
  });

  app.get('/api/communities', jwtAuth, (req, res) => {
    Communities.fetchAll().then((data) =>
      res.json(data)
    );
  });
};
