const path = require('path');

const Community = require(path.join(__dirname, '..', 'models', 'Community.js'));
const Relationship = require(
  path.join(__dirname, '..', 'models', 'RelationshipProfileCommunity.js'));


module.exports = (app, passport, jwt, jwtAuth) => {
  app.get('/communities/create', jwtAuth, (req, res) => res.render('create-community'));

  app.post('/communities/create/success', jwtAuth, (req, res) => {
    new Community({
      name: req.body.community_name,
      profile_picture: null,
      description: req.body.community_desc,
      location: req.body.community_location,
    }).save().then((community) => {
      // get profile_id from login_id
      new Relationship({
        profile_id: 1111,
        community_id: community.attributes.id,
      }).save().then(() => {
        res.redirect('/communities');
      });
    });
  });
};
