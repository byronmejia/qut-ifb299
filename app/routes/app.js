/**
 * Created by byron on 5/09/2016.
 */

module.exports = (app, passport, jwt, jwtAuth, client) => {
  app.get('/profile', jwtAuth, (req, res) => res.render('profile'));
  app.get('/home', jwtAuth, (req, res) => res.render('home'));
  app.get('/dashboard', jwtAuth, (req, res) => res.render('dashboard'));
};
