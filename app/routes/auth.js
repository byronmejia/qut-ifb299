/**
 * Created by byron on 20/08/2016.
 */
module.exports = (app, passport, JWT) => {
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
        return req.logIn(user, (data) => {
          if (!data) {
            return res.redirect('/error?id=3');
          }

          console.log(user);
          const payload = {
            user: user.username,
            ttl: ((new Date).getTime() + 300), // Expire in 5 minutes
            ee: 'http://bitly.com/17mR8bN',
          };

          res.cookie('authToken', JWT.encode(payload));
          return res.redirect('/profile');
        });
      }
    )(req, res);
  });

  app.get('/logout', (req, res) => {
    res.cookie('authToken', {});
    res.render('logout');
  });
};
