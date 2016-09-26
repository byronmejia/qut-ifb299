/**
 * signup.js manages the routes that house all
 * the actionable for signing up for the platform
 *
 * @since 1.0.0
 * @file Manages authentication routes
 * @author Jessica Barron
 * @todo Write appropiate tests
 */
import { Router } from 'express';
import Profile from '../models/Profile';
import Login from '../models/Login';

export default () => {
  const router = new Router();

  /**
   * GET signup page
   *
   * @function
   *
   * @author Jessica Barron
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Generates a form for allowing users to sign up
   * @returns undefined
   */
  router.get('/', (req, res) => {
    res.render('signup/index');
  });

  /**
   * POST signup page
   *
   * @function
   *
   * @author Jessica Barron
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Generates the models related to signing up
   * @returns undefined
   */
  router.post('/', (req, res) => {
    new Login({
      username: req.body.username,
      password: req.body.password,
    }).save().then((login) => {
      new Profile({
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        email: req.body.email,
        mobile: req.body.mobile,
        bio: req.body.bio,
        login_id: login.attributes.id,
      }).save().then(() => {
        res.redirect('/login');
      });
    });
  });

  return router;
};
