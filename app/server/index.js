/**
 * app.js manages the Express Server by including all the files
 * required to start the http server, then dynamically include
 * all routes that will be hit for this app.
 *
 * @since 1.0.0
 * @file Manages the main express Server
 * @author Byron Mejia
 * @author Russel Demos
 * @soundtrack Of Matter - Tesseract
 */
import path from 'path';
import express from 'express';
import morgan from 'morgan';
import passport from 'passport';
import controller from './controller';

const app = express();
require('./config/passport')(passport);
require('./config/app')(app, path, express, passport);
const jwt = require('./config/jwt');
const jwtAuth = require('./config/jwt').auth(passport);

if (!module.parent) app.use(morgan('dev'));

const options = {
  passport,
  jwt,
  jwtAuth,
};

app.use(controller(options));

// Listen
if (!module.parent) app.listen(app.get('port'));

module.exports.getApp = app;
