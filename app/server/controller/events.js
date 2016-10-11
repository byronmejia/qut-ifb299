/**
 * events.js manages the routes that house all
 * the actionable for events, and certain
 * event relationships
 *
 * @since 1.0.0
 * @file Manages authentication routes
 * @author Byron Mejia
 * @author Jessica Barron
 * @module controller/events
 * @todo Get Single Event
 * @todo Update Single Event
 */
import { Router } from 'express';

const Events = require('../models/Event');
const RSVP = require('../models/RelationshipRsvpEventProfile');
const getCurrentProfile = require('../helper/getCurrentProfile');

export default (opts) => {
  const router = new Router();

  /**
   * GET ALL events page
   *
   * @function
   *
   * @author Byron Mejia
   * @author Jessica Barron
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Show all events available to the signed in user
   * @todo Ensure event's view is up to date
   * @returns undefined
   */
  router.get('/', opts.jwtAuth, (req, res) => {
    Events.fetchAll().then(events =>
      res.render('app/events/all', { events: events.models })
    );
   });

  /**
   * GET create event
   *
   * @function
   *
   * @author Byron Mejia
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Renders a form to create an event, for a community.
   * @todo Ensure event's view is up to date
   * @returns undefined
   */
  router.get('/create', opts.jwtAuth, (req, res) => res.render('app/events/new'));

  /**
   * POST create event
   *
   * @function
   *
   * @author Byron Mejia
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Generates the event upon successful fields
   * @todo Ensure event's view is up to date
   * @todo Ensure event saves to appropiate location
   * @returns undefined
   */
  router.post('/events/create', opts.jwtAuth, (req, res) => {
    const start = `${req.body.event_startdate} ${req.body.event_starttime}`;
    const finish = `${req.body.event_enddate} ${req.body.event_endtime}`;
    new Event({
      name: req.body.event_name,
      description: req.body.event_desc,
      startTime: start,
      endTime: finish,
      location_id: 1,
    }).save().then(() => {
      res.send('Data sent?');
    });
  });

  return router;
};
