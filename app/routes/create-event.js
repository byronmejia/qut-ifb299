const path = require('path');

const Event = require(path.join(__dirname, '..', 'models', 'Event.js'));
// const RelationshipRsvpEventProfile = require(
  // path.join(__dirname, '..', 'models', 'RelationshipRsvpEventProfile.js'));

module.exports = (app, passport, jwt, jwtAuth) => {
  app.get('/events/create', jwtAuth, (req, res) => res.render('create-event'));


};

/*
profile_id
event_id
rsvp_id
*/
