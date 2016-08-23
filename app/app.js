// Start with Config Directories
const path = require('path');
const dir = require(path.join(__dirname, 'config', '_init.js'));
const express = require('express');
const logger = require('morgan');
const app = express();
const fs = require('fs');
const passport = require('passport');
require(dir.passport)(passport);
require(dir.app)(app, path, express, passport);
const jwt = require(dir.jwt);
const jwtAuth = require(dir.jwt).auth(passport);

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
  require(route)(app, passport, jwt, jwtAuth); // eslint-disable-line global-require
});

// If none of the above routes hit
// Send 404
app.use((req, res) => {
  res.status(404).render('404', { url: req.originalUrl });
});

// Listen
if (!module.parent) {
  app.listen(app.get('port'));
}
