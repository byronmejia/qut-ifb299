/**
 * profiles.js manages the routes that house all
 * the actionable for profiles, and certain
 * profile relationships
 *
 * @since 1.0.0
 * @file Manages profile routes
 * @author Jessica Barron
 * @module controller/profiles
 */
import { Router } from 'express';

const Profiles = require('../models/Profile');
const getCurrentProfile = require('../helper/getCurrentProfile');

export default (opts) => {
  const router = new Router();

  /**
   * GET CURRENT profile
   *
   * @function
   *
   * @author Jessica Barron
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Show profiles of signed in user
   * @todo Ensure profile's view is up to date
   * @returns undefined
   */
  router.get('/', opts.jwtAuth, (req, res) => {
    getCurrentProfile(req).then((profileId) => {
      Profiles.where({
        id: profileId,
      }).fetch({
        require: true,
      }).then((data) => {
        res.render('app/profile/index', {
          profile: data.attributes,
          current_user: true,
        });
      });
    });
  });

        /**
   * GET One Profile and Edit
   *
   * @function
   *
   * @author Jessica Barron
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Returns a view of a form to edit
   * the current profile
   * @returns undefined
   */
  router.get('/edit', opts.jwtAuth, (req, res) => {
    getCurrentProfile(req).then((profileId) => {
      Profiles.where({
        id: profileId,
      }).fetch({
        require: true,
      }).then((data) => {
        res.render('app/profile/edit', {
          profile: data.attributes,
        });
      });
    });
  });


    /**
   * GET One Profile
   *
   * @function
   *
   * @author Jessica Barron
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Returns a view for ONE profile
   * @returns undefined
   */
  router.get('/:id', opts.jwtAuth, (req, res) => {
    Profiles.where({
      id: req.params.id,
    }).fetch({
      require: true,
    }).then((data) => {
      res.render('app/profile/index', {
        profile: data.attributes,
      });
    });
  });

    /**
   * POST One Profile and Edit
   *
   * @function
   *
   * @author Jessica Barron
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Returns a view upon successfully
   * updating the current community
   * @todo Ensure only certain users may edit the community
   * @returns undefined
   */
  router.post('/edit', opts.jwtAuth, (req, res) => {
    getCurrentProfile(req).then((profileId) => {
      Profiles.where({
        id: profileId,
      }).save({
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        email: req.body.email,
        mobile: req.body.mobile,
        bio: req.body.bio,
      }, {
        patch: true,
      }).then(() => {
        res.redirect('/profile');
      });
    });
  });

  return router;
};
