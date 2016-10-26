/**
 * @since 1.0.0
 * @file Manages the main express Server
 * @author Byron Mejia
 * @author Russel Demos
 * @module controller
 */

import { Router } from 'express';
import auth from './auth';
import misc from './misc';
import communities from './communities';
import events from './events';
import signup from './signup';
import profile from './profile';
import Models from '../models';

const getCurrentProfile = require('../helper/getCurrentProfile');
const Stripe = require('../config/stripe').stripe;

/**
 * Combines all controllers together
 * @param {object} opts - An options parameter, which may include important variables
 * @return {object} The combined router
 */

export default function allControllers(opts) {
  const router = new Router();

  router.use(misc(opts));
  router.use('/auth', auth(opts));
  router.use('/communities', opts.jwtAuth, communities(Models, Stripe, getCurrentProfile));
  router.use('/events', opts.jwtAuth, events());
  router.use('/signup', signup());
  router.use('/profile', opts.jwtAuth, profile(Models, getCurrentProfile));

  return router;
}
