const path = require('path');
const Event = require(path.join(__dirname, '..', 'models', 'Event.js'));

module.exports = (app, passport, jwt, jwtAuth) => {
  app.get('/events/create', jwtAuth, (req, res) => res.render('create-event'));

  app.post('/events/create/success', jwtAuth, (req, res) => {
    const start = req.body.event_startdate + ' ' + req.body.event_starttime;
    const finish = req.body.event_enddate + ' ' + req.body.event_endtime;
    new Event({
      name: req.body.event_name,
      description: req.body.event_desc,
      startTime: start,
      endTime: finish,
      location_id: 1,
    }).save().then(() => {
      console.log("woof");
      res.send("Data sent?");
    });
  });
};
