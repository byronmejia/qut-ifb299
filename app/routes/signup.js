const path = require('path');

const Profile = require(path.join(__dirname, '..', 'models', 'Profile.js'));

const Login = require(path.join(__dirname, '..', 'models', 'Login.js'));

module.exports = (app) => {
  app.get('/signup', (req, res) => {
    res.render('signup');
  });

  app.post('/signup/success', (req, res) => {
    new Login({
      username: req.body.username,
      password: req.body.password,
    }).save().then(() => {
      Login.where('username', req.body.username).fetch({
        require: true,
        columns: id,
      }).then((resData) => {
        var data = JSON.parse(JSON.stringify(resData));
        console.log(data);
        new Profile({
          firstName: req.body.first_name,
          lastName: req.body.last_name,
          email: req.body.email,
          mobile: req.body.mobile,
          bio: req.body.bio,
          login_id: data,
        }).save().then(() => {
          res.send('Thanks for signing up');
        });
      });
    });
  });
};
