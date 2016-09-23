/**
 * Created by byron on 5/09/2016.
 */

module.exports = (app, passport, jwt, jwtAuth) => {
  /**
   * GET Profile page
   *
   * @function
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Render's the current user's profile page
   * @returns undefined
   */
  app.get('/profile', jwtAuth, (req, res) => {
    res.render('profile');
  });

  /**
   * GET Home page
   *
   * @function
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Generates the homepage, with current top news
   * @todo Add Home to sidebar
   * @returns undefined
   */
  app.get('/home', jwtAuth, (req, res) => {
    res.render('home');
  });

  /**
   * GET Dashboard page
   *
   * @function
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Generates an overview/dashboard of what to do
   * @todo Figure if it is necessary with the home page?
   * @returns undefined
   */
  app.get('/dashboard', jwtAuth, (req, res) => {
    res.render('dashboard');
  });
};
