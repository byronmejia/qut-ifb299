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

export default (Models, getCurrentProfile) => {
  const router = new Router();

  /**
   * GET CURRENT profile
   *
   * @function
   *
   * @author Jessica Barron
   * @param {Object} req - Express supertest object
   * @param {Object} res - Express response object
   * @description Show profiles of signed in user
   * @todo Ensure profile's view is up to date
   * @returns undefined
   */
  router.get('/', (req, res) => {
    getCurrentProfile(req).then((profileId) => {
      Models.Profile.where({
        id: profileId,
      }).fetch({
        require: true,
      }).then((profile) => {
        Models.RelationshipProfileCommunity.where({
          profile_id: profileId,
        }).fetchAll({
          require: true,
        }).then((relations) => {
          const comArr = [];
          for (let i = 0, len = relations.length; i < len; i += 1) {
            comArr[i] = relations.models[i].attributes.community_id;
          }
          Models.Community.where('id', 'in', comArr)
          .fetchAll().then((communities) => {
            Models.Rsvp.where({
              profile_id: profileId,
            }).fetchAll().then((rsvp) => {
              const evArr = [];
              for (let i = 0, len = rsvp.length; i < len; i += 1) {
                evArr[i] = rsvp.models[i].attributes.event_id;
              }
              Models.Event.where('id', 'in', evArr)
              .fetchAll().then((events) => {
                res.render('app/profile/index', {
                  profile: profile.attributes,
                  communities: communities.models,
                  events: events.models,
                  current_user: true,
                });
              });
            });
          });
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
   * @param {Object} req - Express supertest object
   * @param {Object} res - Express response object
   * @description Returns a view of a form to edit
   * the current profile
   * @returns undefined
   */
  router.get('/edit', (req, res) => {
    getCurrentProfile(req).then((profileId) => {
      Models.Profile.where({
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
   * @param {Object} req - Express supertest object
   * @param {Object} res - Express response object
   * @description Returns a view for ONE profile
   * @returns undefined
   */
  router.get('/:id', (req, res) => {
    Models.Profile.where({
      id: req.params.id,
    }).fetch({
      require: true,
    }).then((profile) => {
      Models.RelationshipProfileCommunity.where({
        profile_id: req.params.id,
      }).fetchAll({
        require: true,
      }).then((relations) => {
        const comArr = [];
        for (let i = 0, len = relations.length; i < len; i += 1) {
          comArr[i] = relations.models[i].attributes.community_id;
        }
        Models.Community.where('id', 'in', comArr)
        .fetchAll().then((communities) => {
          Models.Rsvp.where({
            profile_id: req.params.id,
          }).fetchAll().then((rsvp) => {
            const evArr = [];
            for (let i = 0, len = rsvp.length; i < len; i += 1) {
              evArr[i] = rsvp.models[i].attributes.event_id;
            }
            Models.Event.where('id', 'in', evArr)
            .fetchAll().then((events) => {
              res.render('app/profile/index', {
                profile: profile.attributes,
                communities: communities.models,
                events: events.models,
                current_user: true,
              });
            });
          });
        });
      });
    });
  });

    /**
   * POST One Profile and Edit
   *
   * @function
   *
   * @author Jessica Barron
   * @param {Object} req - Express supertest object
   * @param {Object} res - Express response object
   * @description Returns a view upon successfully
   * updating the current community
   * @todo Ensure only certain users may edit the community
   * @returns undefined
   */
  router.post('/edit', (req, res) => {
    getCurrentProfile(req).then((profileId) => {
      Models.Profile.where({
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
