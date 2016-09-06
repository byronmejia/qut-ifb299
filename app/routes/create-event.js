module.exports = (app, passport, jwt, jwtAuth) => {
  app.get('/events/create', jwtAuth, (req, res) => res.render('create-event'));
};
