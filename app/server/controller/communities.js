/**
 * communities.js manages the routes that house all
 * the actionable for communities, and certain
 * community relationships
 *
 * @since 1.0.0
 * @file Manages authentication routes
 * @author Byron Mejia
 * @author Jessica Barron
 * @soundtrack Of Energy - Tesseract
 * @module controller/communities
 * @todo cleanup import system
 */
import { Router } from 'express';

const path = require('path');

const Communities = require('../models/Community');
const Events = require('../models/Event');
const Charges = require('../models/Charges');
const stripe = require('../config/stripe').stripe;
const getCurrentProfile = require('../helper/getCurrentProfile');

const keyPath = path.join('..', 'config', 'keys.json');

let keys;

try {
  keys = require(keyPath); // eslint-disable-line
} catch (err) {
  console.log(err); // eslint-disable-line no-console
  keys = {
    stripe: {
      test: {
        publish: process.env.ST_TEST_PUB,
        secret: process.env.ST_TEST_SEC,
      },
      live: {
        publish: process.env.ST_LIVE_PUB,
        secret: process.env.ST_LIVE_SEC,
      },
    },
  };
}

const Relationship = require('../models/RelationshipProfileCommunity');

export default () => {
  const router = new Router();

  /**
   * GET all communities
   *
   * @function
   *
   * @author Byron Mejia
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Returns a view of all communities
   * on the platform
   * @returns undefined
   */
  router.get('/', (req, res) => {
    Communities.fetchAll().then(communities =>
      res.render('app/communities/all', { communities: communities.models })
    );
  });

  /**
   * GET Create a Community
   *
   * @function
   *
   * @author Jessica Barron
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Returns a view of a form for
   * creating a community
   * @returns undefined
   */
  router.get('/create', (req, res) =>
    res.render('app/communities/new')
  );

  /**
   * POST Create a Community
   *
   * @function
   *
   * @author Jessica Barron
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Generates a community with
   * the given attributes from the form.
   * @todo Ensure the currently logged in user will join the community
   * @returns undefined
   */
  router.post('/create', (req, res) => {
    getCurrentProfile(req).then((profileId) => {
      new Communities({
        name: req.body.community_name,
        profile_picture: null,
        description: req.body.community_desc,
        location: req.body.community_location,
      }).save().then((community) => {
        new Relationship({
          profile_id: profileId,
          community_id: community.attributes.id,
        }).save().then(() => {
          res.redirect('/communities');
        });
      });
    });
  });

  /**
   * GET One Community
   *
   * @function
   *
   * @author Jessica Barron
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Returns a view for ONE community
   * @returns undefined
   */
  router.get('/:id', (req, res) => {
    Communities.where({
      id: req.params.id,
    }).fetch({
      require: true,
      withRelated: ['profiles'],
    }).then((community) => {
      Events.where({
        community_id: community.attributes.id,
      }).fetchAll().then((events) => {
        res.render('app/communities/index', {
          community: community.attributes,
          events: events.models,
          profiles: community.relations.profiles.models,
        });
      });
    });
  });

  /**
   * GET One Community and Join
   *
   * @function
   *
   * @author Jessica Barron
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Returns a view upon successfully joining
   * a community
   * @returns undefined
   */
  router.get('/:id/join', (req, res) => {
    getCurrentProfile(req).then((id) => {
      new Relationship({
        community_id: req.params.id,
        profile_id: id,
      }).save().then(() => {
        res.redirect('/communities');
      });
    });
  });

  /**
   * GET One Community and Edit
   *
   * @function
   *
   * @author Jessica Barron
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Returns a view of a form to edit
   * the current community, if joined
   * @todo Ensure only certain users may edit the community
   * @returns undefined
   */
  router.get('/:id/edit', (req, res) => {
    Communities.where({
      id: req.params.id,
    }).fetch({
      require: true,
    }).then((data) => {
      res.render('app/communities/edit', {
        community: data.attributes,
      });
    });
  });

  /**
   * POST One Community and Edit
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
    Communities.where({
      id: req.params.id,
    }).save({
      name: req.body.community_name,
      profile_picture: null,
      description: req.body.community_desc,
      location: req.body.community_location,
    }, {
      patch: true,
    }).then(() => {
      res.redirect('/communities');
    });
  });

  /**
   * GET One Community and Donate
   *
   * @function
   *
   * @author Byron Mejia
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Returns a view with a form to allow
   * the logged in user to donate to the current community
   * @returns undefined
   */
  router.get('/:id/donate', (req, res) => {
    Communities.where({ id: req.params.id }).fetch()
      .then((data) => {
        res.render(
          'app/communities/donate/index', { community: data, stripe_pub: keys.stripe.test.publish }
        );
      });
  });

  /**
   * POST One Community and Donate
   *
   * @function
   *
   * @author Byron Mejia
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @description Returns a view upon successfully donating
   * to a community.
   * @todo remove some logic from controller!
   * @returns undefined
   */
  router.post('/:id/donate', (req, res) => {
    let amount = parseFloat(req.body.finalAmount).toFixed(2);
    const token = req.body.stripeToken;
    amount = Math.round(amount * 100);

    if (isNaN(amount)) res.render('app/communities/donate/amount_error');

    stripe.charges.create({
      amount,
      currency: 'aud',
      source: token,
      description: 'Charge for Coterie Online',
    }, (err, charge) => {
      if (!err) {
        Communities.where({ id: req.params.id })
          .fetch()
          .then((community) => {
            new Charges({
              id: charge.id,
              community_id: community.attributes.id,
            }).save(null, { method: 'insert' });
            new Communities({
              id: community.attributes.id,
              currentAmount: community.attributes.currentAmount + amount,
            }).save();
          })
          .then(() => {
            res.render('app/communities/donate/thank-you');
          });
      } else res.render('app/communities/donate/stripe_error');
    });
  });

  return router;
};
