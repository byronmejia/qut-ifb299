/**
 * Created by byron on 20/08/2016.
 */

function payloadGenerator(userObject) {
  return {
    user: userObject,
    ttl: ((new Date()).getTime() + 300000), // Expire in 5 minutes,
    ee: 'http://bitly.com/17mR8bN',
  };
}

module.exports = (app, passport, JWT, jwtAuth) => {
  app.get('/login', (req, res) => {
    passport.authenticate('jwt', (err, data) => {
      if (err) return res.redirect('/error?id=1');
      if (data) return res.redirect('/home');

      if (req.query.attempt > 0) {
        return res.render('login', { attempt: 1 });
      }

      return res.render('login');
    })(req, res);
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
          const payload = payloadGenerator(user.attributes.id);
          res.cookie('authToken', JWT.encode(payload));
          return res.redirect('/dashboard');
        });
      }
    )(req, res);
  });

  app.get('/logout', jwtAuth, (req, res) => {
    res.cookie('authToken', '');
    res.render('logout');
  });
};
