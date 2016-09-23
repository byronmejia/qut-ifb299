/**
 * auth.js manages the routes that users may challenge for
 * different authentication methods. This includes:
 * Local, Facebook, GitHub, Google, JWT
 *
 * @since 1.0.0
 * @file Manages authentication routes
 * @author Byron Mejia
 * @author Russel Demos
 * @soundtrack Of Mind - Tesseract
 */

import { Router } from 'express';

function payloadGenerator(userObject) {
  return {
    user: userObject,
    ttl: ((new Date()).getTime() + 18000000), // Expire in 5 days,
    ee: 'http://bitly.com/17mR8bN',
  };
}

export default (opts) => {
  const router = new Router();

  /**
   * GET Logout page
   *
   * @function
   *
   * @author Byron Mejia
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Destroys the JWT token on the client
   * @todo Explicitly state last logout time in persistence
   * @returns undefined
   */
  router.get('/logout', opts.jwtAuth, (req, res) => {
    res
      .cookie('authToken', '')
      .render('logout');
  });

  /**
   * GET Login page
   *
   * @function
   *
   * @author Byron Mejia
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Loads a form for signing in
   * @returns undefined
   */
  router.get('/login', (req, res) => {
    opts.passport.authenticate('jwt', (err, data) => {
      if (err) return res.redirect('/error?id=1');
      if (data) return res.redirect('/home');
      if (req.query.attempt > 0) return res.render('login', { attempt: 1 });

      return res.render('login');
    })(req, res);
  });

  /**
   * POST local auth strategy
   *
   * @function
   *
   * @author Byron Mejia
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Challenges passport with local username and password
   * @returns undefined
   */
  router.post('/local', (req, res) => {
    opts.passport.authenticate('local',
      (err, user) => {
        if (err) return res.redirect('/error?id=1');
        if (!user) return res.redirect('/auth/login?attempt=1');

        return req.logIn(user,
          (data) => {
            if (!data) return res.redirect('/error?id=3');

            const payload = payloadGenerator(user.attributes.id);
            res.cookie('authToken', opts.jwt.encode(payload));
            return res.redirect('/dashboard');
          }
        );
      }
    )(req, res);
  });

  /**
   * GET Facebook Strategy
   *
   * @function
   *
   * @author Byron Mejia
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Challenges passport with Facebook login
   * @returns undefined
   */
  router.get('/facebook', opts.passport.authenticate('facebook'));

  /**
   * GET Facebook Callback Strategy
   *
   * @function
   *
   * @author Byron Mejia
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Upon successful challenge, will set
   * the session's JWT token, else, will redirect to either
   * an error or login page. Depending whether internal server
   * error, or bad login credentials.
   * @returns undefined
   */
  router.get('/callback/facebook', (req, res) =>
    opts.passport.authenticate('facebook',
      (err, type) => {
        if (err) return res.redirect('/error?id=1');
        if (!type) return res.redirect('/login?attempt=34');

        const payload = payloadGenerator(type.attributes.login_id);
        res.cookie('authToken', opts.jwt.encode(payload));
        return res.redirect('/dashboard');
      }
    )(req, res)
  );

  /**
   * GET Facebook Link Strategy
   *
   * @function
   *
   * @author Byron Mejia
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Prepares the Facebook strategy for
   * saving to the current logged in user.
   * @returns undefined
   */
  router.get('/link/facebook', opts.jwtAuth, opts.passport.authenticate('facebook_link'));

  /**
   * GET Facebook Link Callback Strategy
   *
   * @function
   *
   * @author Byron Mejia
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Adds a new Facebook strategy to
   * the currently logged in user, if successful.
   * @returns undefined
   */
  router.get('/callback/facebook/new', (req, res) =>
    opts.passport.authenticate('facebook_link',
      (err, type) => {
        if (err) return res.redirect('/error?id=1');
        if (req.cookies.authToken === '') return res.redirect('/auth/login?attempt=42');
        if (!type) res.redirect('/profile?authError=1');

        let decoded = '';
        try {
          decoded = opts.jwt.decode(req.cookies.authToken);
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
   * @author Byron Mejia
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Challenges passport with GitHub login
   * @returns undefined
   */
  router.get('/github', opts.passport.authenticate('github'));

  /**
   * GET GitHub Link Callback Strategy
   *
   * @function
   *
   * @author Byron Mejia
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Adds a new GitHub strategy to
   * the currently logged in user, if successful.
   * @returns undefined
   */
  router.get('/callback/github', (req, res) =>
    opts.passport.authenticate('github',
      (err, type) => {
        if (err) return res.redirect('/error?id=1');
        if (!type) return res.redirect('/auth/login?attempt=34');
        const payload = payloadGenerator(type.attributes.login_id);
        res.cookie('authToken', opts.jwt.encode(payload));
        return res.redirect('/dashboard');
      }
    )(req, res)
  );

  /**
   * GET GitHub Link Strategy
   *
   * @function
   *
   * @author Byron Mejia
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Prepares the GitHub strategy for
   * saving to the current logged in user.
   * @returns undefined
   */
  router.get('/link/github', opts.jwtAuth, opts.passport.authenticate('github_link'));

  /**
   * GET GitHub Link Callback Strategy
   *
   * @function
   *
   * @author Byron Mejia
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Adds a new GitHub strategy to
   * the currently logged in user, if successful.
   * @returns undefined
   */
  router.get('/callback/github/new', (req, res) =>
    opts.passport.authenticate('github_link',
      (err, type) => {
        if (err) return res.redirect('/error?id=1');
        if (req.cookies.authToken === '') return res.redirect('/auth/login?attempt=42');
        if (!type) res.redirect('/profile?authError=1');

        let decoded = '';
        try {
          decoded = opts.jwt.decode(req.cookies.authToken);
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
   * @author Byron Mejia
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Challenges passport with Google login
   * @returns undefined
   */
  router.get('/google', opts.passport.authenticate('google', { scope: [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read',
  ] }));

  /**
   * GET Google Link Callback Strategy
   *
   * @function
   *
   * @author Byron Mejia
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Adds a new Google strategy to
   * the currently logged in user, if successful.
   * @returns undefined
   */
  router.get('/callback/google', (req, res) =>
    opts.passport.authenticate('google',
      (err, type) => {
        if (err) return res.redirect('/error?id=1');
        if (!type) return res.redirect('/auth/login?attempt=34');

        const payload = payloadGenerator(type.attributes.login_id);
        res.cookie('authToken', opts.jwt.encode(payload));
        return res.redirect('/dashboard');
      }
    )(req, res)
  );

  /**
   * GET Google Link Strategy
   *
   * @function
   *
   * @author Byron Mejia
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Prepares the Google strategy for
   * saving to the current logged in user.
   * @returns undefined
   */
  router.get('/link/google', opts.jwtAuth, opts.passport.authenticate('google_link', { scope: [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read',
  ] }));

  /**
   * GET Google Link Callback Strategy
   *
   * @function
   *
   * @author Byron Mejia
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Adds a new Google strategy to
   * the currently logged in user, if successful.
   * @returns undefined
   */
  router.get('/callback/google/new', (req, res) =>
    opts.passport.authenticate('google_link',
      (err, type) => {
        if (err) return res.redirect('/error?id=1');
        if (req.cookies.authToken === '') return res.redirect('/auth/login?attempt=42');
        if (!type) res.redirect('/profile?authError=1');

        let decoded = '';
        try {
          decoded = opts.jwt.decode(req.cookies.authToken);
        } catch (e) {
          decoded = false;
        }
        type.save({ login_id: decoded.user }, { method: 'insert' });

        return res.redirect('/profile');
      }
    )(req, res)
  );

  return router;
};
