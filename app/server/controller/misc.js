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

export default (opts) => {
  const router = new Router();

  /**
   * GET root page
   *
   * @function
   *
   * @param {Object} req - Express supertest object
   * @param {Object} res - Express response object
   * @description Render's the highest level homepage, that the public can see
   * @returns undefined
   */
  router.get('/', (req, res) => {
    res.render('index', { url: req.originalUrl });
  });

  /**
   * GET Dashboard page
   *
   * @function
   *
   * @author Byron Mejia
   * @param {Object} req - Express supertest object
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
