const path = require('path');

const Profile = require(path.join(__dirname, '..', 'models', 'Profile.js'));

const Login = require(path.join(__dirname, '..', 'models', 'Login.js'));

module.exports = (app) => {
  app.get('/signup', (req, res) => {
    res.render('signup');
  });

  app.post('/signup/success', (req, res) => {
    new Login({
      firstName: req.body.first_name,
      username: req.body.username,
      password: req.body.password,
      lastlogin: null,
    }).save().then(() => {
      res.send('Data sent?');
      // get login id
      new Profile({
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        email: req.body.email,
        mobile: req.body.mobile,
        bio: req.body.bio,
        login_id: 1,
      }).save().then(() => {
        res.send('Data sent?');
      });
    });
  });
};
