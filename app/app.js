// Start with Config Directories
import path from 'path';
import express from 'express';
import morgan from 'morgan';
import * as fs from 'fs';
import passport from 'passport';

const dir = require(path.join(__dirname, 'config', '_init.js'));
const app = express();
require(dir.passport)(passport);
require(dir.app)(app, path, express, passport);
const jwt = require(dir.jwt);
const jwtAuth = require(dir.jwt).auth(passport);

//file handling
const s3 = require(dir.s3).s3;
const client = require(dir.s3).client;

if (!module.parent) app.use(morgan('dev'));

// Dynamically load routes
const routePath = path.join(__dirname, 'routes');
fs.readdirSync(routePath).forEach((file) => {
  const route = path.join(routePath, file);
  require(route)(app, passport, jwt, jwtAuth, client, s3); // eslint-disable-line global-require
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
