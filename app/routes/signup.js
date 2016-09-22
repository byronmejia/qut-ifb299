const path = require('path');

const Profile = require(path.join(__dirname, '..', 'models', 'Profile.js'));

const Login = require(path.join(__dirname, '..', 'models', 'Login.js'));

module.exports = (app) => {
  app.get('/signup', (req, res) => {
    res.render('signup/index');
  });

  app.post('/signup', (req, res) => {
    new Login({
      username: req.body.username,
      password: req.body.password,
    }).save().then((login) => {
      new Profile({
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        email: req.body.email,
        mobile: req.body.mobile,
        bio: req.body.bio,
        login_id: login.attributes.id,
      }).save().then(() => {
        res.redirect('/login');
      });
    });
  });
};
