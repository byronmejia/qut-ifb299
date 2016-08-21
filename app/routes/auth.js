/**
 * Created by byron on 20/08/2016.
 */

module.exports = (app, passport) => {
  app.get('/login', (req, res) => {
    if (req.query.attempt > 0) {
      res.render('login', { attempt: 1 });
    } else {
      res.render('login');
    }
  });

  app.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/',
    session: false,
  }));

  app.get('/logout', (req, res) => {
    res.cookie('authToken', {});
    res.render('logout');
  });
};
