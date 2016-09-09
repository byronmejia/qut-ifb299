module.exports = (app, passport, jwt, jwtAuth) => {
  app.get('/events/create', jwtAuth, (req, res) => res.render('create_event'));
};

/* app.post('/events/create', jwtAuth, (req, res) => {
      req.body.event_name
      req.body.event_desc
      req.body.event_location
      req.body.event_startdate
      req.body.event_starttime
      req.body.event_enddate
      req.body.event_endtime
  });
}; */
