/**
 * Created by byron on 20/08/2016.
 */

function payloadGenerator(userObject) {
  return {
    user: userObject,
    ttl: ((new Date()).getTime() + 18000000), // Expire in 5 days,
    ee: 'http://bitly.com/17mR8bN',
  };
}

module.exports = (app, passport, JWT, jwtAuth) => {
  /**
   * GET Logout page
   *
   * @function
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Destroys the JWT token on the client
   * @todo Explicitly state last logout time in persistence
   * @returns undefined
   */
  app.get('/logout', jwtAuth, (req, res) => {
    res.cookie('authToken', '');
    res.render('logout');
  });

  /**
   * GET Login page
   *
   * @function
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Loads a form for signing in
   * @returns undefined
   */
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

  app.post('/auth/local', (req, res) => {
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

  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get('/auth/callback/facebook', (req, res) =>
    passport.authenticate('facebook',
      (err, type) => {
        if (err) return res.redirect('/error?id=1');
        if (!type) return res.redirect('/login?attempt=34');
        const payload = payloadGenerator(type.attributes.login_id);
        res.cookie('authToken', JWT.encode(payload));
        return res.redirect('/dashboard');
      }
    )(req, res)
  );

  app.get('/auth/link/facebook', jwtAuth, passport.authenticate('facebook_link'));
  app.get('/auth/callback/facebook/new', (req, res) =>
    passport.authenticate('facebook_link',
      (err, type) => {
        if (err) return res.redirect('/error?id=1');
        if (req.cookies.authToken === '') return res.redirect('/login?attempt=42');
        if (!type) res.redirect('/profile?authError=1');

        let decoded = '';
        try {
          decoded = JWT.decode(req.cookies.authToken);
        } catch (e) {
          decoded = false;
        }
        type.save({ login_id: decoded.user }, { method: 'insert' });
        return res.redirect('/dashboard');
      }
    )(req, res)
  );

  app.get('/auth/github', passport.authenticate('github'));
  app.get('/auth/callback/github', (req, res) =>
    passport.authenticate('github',
      (err, type) => {
        if (err) return res.redirect('/error?id=1');
        if (!type) return res.redirect('/login?attempt=34');
        const payload = payloadGenerator(type.attributes.login_id);
        res.cookie('authToken', JWT.encode(payload));
        return res.redirect('/dashboard');
      }
    )(req, res)
  );

  app.get('/auth/link/github', jwtAuth, passport.authenticate('github_link'));
  app.get('/auth/callback/github/new', (req, res) =>
    passport.authenticate('github_link',
      (err, type) => {
        if (err) return res.redirect('/error?id=1');
        if (req.cookies.authToken === '') return res.redirect('/login?attempt=42');
        if (!type) res.redirect('/profile?authError=1');

        let decoded = '';
        try {
          decoded = JWT.decode(req.cookies.authToken);
        } catch (e) {
          decoded = false;
        }
        type.save({ login_id: decoded.user }, { method: 'insert' });
        return res.redirect('/dashboard');
      }
    )(req, res)
  );
};
