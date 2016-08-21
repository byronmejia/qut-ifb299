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

  app.post('/login', (req, res) => {
    passport.authenticate('local', (user, err) => {
      if (err) res.redirect('/login?attempt=2', 400);
      if (!user) res.redirect('/login?attempt=1', 400);
      const token = jwt.encode({ username: 'somedata' }, tokenSecret);
      res.cookie('auth', token);
      res.redirect('/');
    });
  });

  app.get('/logout', (req, res) => {
    res.cookie('auth', {});
    res.render('logout');
  });
};
