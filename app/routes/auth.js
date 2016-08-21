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
    passport.authenticate('local',
      (err, user) => {
        if (err) return res.redirect('/error?id=1');
        if (!user) return res.redirect('/login?attempt=1');
        let good = true;
        req.login(user, () => {
          if (err){
            return res.redirect('/error?id=3');
          } else {
            return res.redirect('/success');
          }
        });
      }
    )(req, res);
  });

  app.get('/logout', (req, res) => {
    res.cookie('authToken', {});
    res.render('logout');
  });
};
