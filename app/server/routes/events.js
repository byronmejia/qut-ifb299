/**
 * events.js manages the routes that house all
 * the actionable for events, and certain
 * event relationships
 *
 * @since 1.0.0
 * @file Manages authentication routes
 * @author Byron Mejia
 * @author Jessica Barron
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
    new Events({
      name: req.body.event_name,
      description: req.body.event_desc,
      startTime: start,
      endTime: finish,
      location_id: 1,
    }).save().then(() => {
      res.send('Data sent?');
    });
  });

  /**
   * GET One Event
   *
   * @function
   *
   * @author Jessica Barron
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Returns a view for ONE event
   * @returns undefined
   */
  router.get('/:id', opts.jwtAuth, (req, res) => {
    let going;
    getCurrentProfile(req).then((pid) => {
      RSVP.where({
        profile_id: pid,
        event_id: req.params.id,
      }).fetch({
        require: false,
      }).then((result) => {
        if (result === null) {
          going = false;
        } else {
          going = true;
        }
        Events.where({
          id: req.params.id,
        }).fetch({
          require: true,
        }).then((data) => {
          res.render('app/events/index', {
            event: data.attributes,
            is_going: going,
          });
        });
      });
    });
  });

  return router;
};
