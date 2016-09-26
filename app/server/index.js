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
import router from './routes';

const dir = require(path.join(__dirname, 'config', '_init.js'));
const app = express();
require(dir.passport)(passport);
require(dir.app)(app, path, express, passport);
const jwt = require(dir.jwt);
const jwtAuth = require(dir.jwt).auth(passport);

if (!module.parent) app.use(morgan('dev'));

const options = {
  passport,
  jwt,
  jwtAuth,
};

app.use(router(options));

// Listen
if (!module.parent) app.listen(app.get('port'));

module.exports.getApp = app;
