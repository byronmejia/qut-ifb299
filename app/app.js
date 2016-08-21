// Requirements
const express = require('express');
const logger = require('morgan');
const path = require('path');
const app = express();
const fs = require('fs');
const passport = require(path.join(__dirname, 'config', 'passport')).passport;

// Setup the app
app.set('port', process.env.PORT || 3000);

// Set the views
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Log the requests
if (!module.parent) app.use(logger('dev'));

// Dynamically load models
const modelPath = path.join(__dirname, 'models');
fs.readdirSync(modelPath).forEach((file) => {
  const model = path.join(modelPath, file);
  require(model); // eslint-disable-line global-require
});

// Dynamically load routes
const routePath = path.join(__dirname, 'routes');
fs.readdirSync(routePath).forEach((file) => {
  const route = path.join(routePath, file);
  require(route)(app, passport); // eslint-disable-line global-require
});

// assume 404 since no middleware responded
app.use((req, res) => {
  res.status(404).render('404', { url: req.originalUrl });
});

// Listen
if (!module.parent) {
  app.listen(app.get('port'));
}
