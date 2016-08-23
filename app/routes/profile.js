module.exports = (app, passport, jwt, jwtAuth) => {
  app.get('/profile', jwtAuth, (req, res) => res.render('profile'));
};
