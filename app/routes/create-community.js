const path = require('path');
const Community = require(path.join(__dirname, '..', 'models', 'Community.js'));

module.exports = (app, passport, jwt, jwtAuth) => {
  app.get('/communities/create', jwtAuth, (req, res) => res.render('create-community'));

  app.post('/communities/create/success', jwtAuth, (req, res) => {
    new Community({
      name: req.body.community_name,
      profile_picture: null,
      description: req.body.community_desc,
      location: req.body.community_location,
    }).save().then(() => {
        console.log("woof");
        res.send("Data sent?");
    });
  });
};
