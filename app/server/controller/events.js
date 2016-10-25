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
const Communities = require('../models/Community');
const RSVP = require('../models/RelationshipRsvpEventProfile');
const getCurrentProfile = require('../helper/getCurrentProfile');
const Location = require('../models/Location');

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
  router.get('/', (req, res) => {
    Events.fetchAll().then((events) => {
      res.render('app/events/all', {
        events: events.models,
      });
    });
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
  router.get('/create', (req, res) => {
    Communities.fetchAll().then((communities) => {
      res.render('app/events/new', {
        communities: communities.models,
      });
    });
  });

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
  router.post('/create', (req, res) => {
    const start = `${req.body.event_startdate} ${req.body.event_starttime}`;
    const finish = `${req.body.event_enddate} ${req.body.event_endtime}`;
    new Location({
      lat: req.body.place_lat,
      lon: req.body.place_lng,
      locationName: req.body.event_location,
    }).save().then((location) => {
      new Events({
        name: req.body.event_name,
        description: req.body.event_desc,
        startTime: start,
        endTime: finish,
        location_id: location.attributes.id,
        community_id: req.body.community_name,
      }).save().then(() => {
        res.redirect('/events');
      });
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
  router.get('/:id', (req, res) => {
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
          Location.where({
            id: data.attributes.location_id,
          }).fetch({
            require: true,
          }).then((location) => {
            res.render('app/events/index', {
              event: data.attributes,
              location: location.attributes,
              profiles: data.profiles,
              is_going: going,
            });
          });
        });
      });
    });
  });

    /**
   * GET One Event and Edit
   *
   * @function
   *
   * @author Jessica Barron
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Returns a view of a form to edit
   * the current event
   * @returns undefined
   */
  router.get('/:id/edit', (req, res) => {
    Events.where({
      id: req.params.id,
    }).fetch({
      require: true,
    }).then((data) => {
      res.render('app/events/edit', {
        event: data.attributes,
      });
    });
  });

  /**
   * POST One Event and Edit
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
  router.post('/:id/edit', (req, res) => {
    const start = `${req.body.event_startdate} ${req.body.event_starttime}`;
    const finish = `${req.body.event_enddate} ${req.body.event_endtime}`;
    Events.where({
      id: req.params.id,
    }).save({
      name: req.body.event_name,
      description: req.body.event_desc,
      startTime: start,
      endTime: finish,
    }, {
      patch: true,
    }).then(() => {
      res.redirect('/events');
    });
  });

  return router;
};
