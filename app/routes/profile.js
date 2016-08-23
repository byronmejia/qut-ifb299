module.exports = (app, passport, jwt, jwtAuth) => {
  app.get('/profile', jwtAuth, function(req, res) {
    res.render('profile');
  });
};
