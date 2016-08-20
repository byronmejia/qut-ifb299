/**
 * Created by byron on 20/08/2016.
 */

module.exports = (app, passport) => {
  app.get('/login', (req, res) => {
    if (req.query.attempt > 0) {
      res.render('login', { url: req.originalUrl, attempt: 1 });
    } else {
      res.render('login', { url: req.originalUrl });
    }
  });

  app.post('/login',
    passport.authenticate('local', { successRedirect: '/',
      failureRedirect: '/login?attempt=1',
      session: false,
    }));
};
