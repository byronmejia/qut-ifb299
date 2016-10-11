/**
 * misc.js manages routes that do not really belong
 * in any other routes file...
 *
 * @since 1.0.0
 * @file Manages authentication routes
 * @author Byron Mejia
 * @soundtrack Of Reality - Tesseract
 * @module controller/misc
 */
import { Router } from 'express';

// S3
const path = require('path');

const multer = require('multer');

const upload = multer({ dest: path.join(__dirname, '../temp/') });

const fileUploader = require('../helper/fileUploader.js');

export default (opts) => {
  const router = new Router();

  /**
   * GET root page
   *
   * @function
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Render's the highest level homepage, that the public can see
   * @returns undefined
   */
  router.get('/', (req, res) => {
    res.render('index', { url: req.originalUrl });
  });

  /**
   * GET Profile page
   *
   * @function
   *
   * @author Byron Mejia
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Render's the current user's profile page
   * @returns undefined
   */
  router.get('/profile', opts.jwtAuth, (req, res) => {
    // TODO Attempt to pull picture from database
    res.render('profile');
  });

  /**
   * POST Profile page
   *
   * @function
   *
   * @author Russel Demos
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Stores user picture, adds link to database
   * @returns undefined
   */
  router.post('/profile', opts.jwtAuth, upload.array('files'), (req, res) => {
    // TODO check if logged in

    // Magical Instructions
    const uploadParams = {
      fileAmount: 1,
      maxFileSize: 2,
      // Make Sure The Bucket Exists, You Can't Create One From API
      bucketName: 'profile-pictures',
    };

    // Convert Images To Links Via Magic
    fileUploader.upload(req, uploadParams, (imageUrl, error) => {
      // TODO Display error prompt
      if (error) { res.render('profile'); return; }

      // TODO Store Links In Database

      // Render Profile
      res.render('profile', { image: imageUrl });
    });
  });

  /**
   * GET Home page
   *
   * @function
   *
   * @author Byron Mejia
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Generates the homepage, with current top news
   * @todo Add Home to sidebar
   * @returns undefined
   */
  router.get('/home', opts.jwtAuth, (req, res) => {
    res.render('home');
  });

  /**
   * GET Dashboard page
   *
   * @function
   *
   * @author Byron Mejia
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Generates an overview/dashboard of what to do
   * @todo Figure if it is necessary with the home page?
   * @returns undefined
   */
  router.get('/dashboard', opts.jwtAuth, (req, res) => {
    res.render('dashboard');
  });

  return router;
};
