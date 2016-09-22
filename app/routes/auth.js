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

  /**
   * POST local auth strategy
   *
   * @function
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Challenges passport with local username and password
   * @returns undefined
   */
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

  /**
   * GET Facebook Strategy
   *
   * @function
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Challenges passport with Facebook login
   * @returns undefined
   */
  app.get('/auth/facebook', passport.authenticate('facebook'));

  /**
   * GET Facebook Callback Strategy
   *
   * @function
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Upon successful challenge, will set
   * the session's JWT token, else, will redirect to either
   * an error or login page. Depending whether internal server
   * error, or bad login credentials.
   * @returns undefined
   */
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

  /**
   * GET Facebook Link Strategy
   *
   * @function
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Prepares the Facebook strategy for
   * saving to the current logged in user.
   * @returns undefined
   */
  app.get('/auth/link/facebook', jwtAuth, passport.authenticate('facebook_link'));

  /**
   * GET Facebook Link Callback Strategy
   *
   * @function
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Adds a new Facebook strategy to
   * the currently logged in user, if successful.
   * @returns undefined
   */
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
        return res.redirect('/profile');
      }
    )(req, res)
  );

  /**
   * GET GitHub Strategy
   *
   * @function
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Challenges passport with GitHub login
   * @returns undefined
   */
  app.get('/auth/github', passport.authenticate('github'));

  /**
   * GET GitHub Link Callback Strategy
   *
   * @function
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Adds a new GitHub strategy to
   * the currently logged in user, if successful.
   * @returns undefined
   */
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

  /**
   * GET GitHub Link Strategy
   *
   * @function
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Prepares the GitHub strategy for
   * saving to the current logged in user.
   * @returns undefined
   */
  app.get('/auth/link/github', jwtAuth, passport.authenticate('github_link'));

  /**
   * GET GitHub Link Callback Strategy
   *
   * @function
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Adds a new GitHub strategy to
   * the currently logged in user, if successful.
   * @returns undefined
   */
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
        return res.redirect('/profile');
      }
    )(req, res)
  );

  /**
   * GET Google Strategy
   *
   * @function
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Challenges passport with Google login
   * @returns undefined
   */
  app.get('/auth/google', passport.authenticate('google', { scope: [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read',
  ] }));

  /**
   * GET Google Link Callback Strategy
   *
   * @function
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Adds a new Google strategy to
   * the currently logged in user, if successful.
   * @returns undefined
   */
  app.get('/auth/callback/google', (req, res) =>
    passport.authenticate('google',
      (err, type) => {
        if (err) return res.redirect('/error?id=1');
        if (!type) return res.redirect('/login?attempt=34');
        const payload = payloadGenerator(type.attributes.login_id);
        res.cookie('authToken', JWT.encode(payload));
        return res.redirect('/dashboard');
      }
    )(req, res)
  );

  /**
   * GET Google Link Strategy
   *
   * @function
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Prepares the Google strategy for
   * saving to the current logged in user.
   * @returns undefined
   */
  app.get('/auth/link/google', jwtAuth, passport.authenticate('google_link', { scope: [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read',
  ] }));

  /**
   * GET Google Link Callback Strategy
   *
   * @function
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Adds a new Google strategy to
   * the currently logged in user, if successful.
   * @returns undefined
   */
  app.get('/auth/callback/google/new', (req, res) =>
    passport.authenticate('google_link',
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

        return res.redirect('/profile');
      }
    )(req, res)
  );
};
