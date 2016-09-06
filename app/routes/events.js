/**
 * Created by byron on 5/09/2016.
 */

module.exports = (app, passport, jwt, jwtAuth) => {
  app.get('/events', jwtAuth, (req, res) => res.render('profile'));
};
