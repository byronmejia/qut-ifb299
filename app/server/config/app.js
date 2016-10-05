/**
 * config/events.js manages the configuration
 * for the application.
 *
 * @since 1.0.0
 * @file Manages application configuration
 * @author Byron Mejia
 * @todo Get Single Event
 * @todo Update Single Event
 */
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import sassMiddleware from 'node-sass-middleware';
import browserify from 'browserify-middleware';

module.exports = (app, path, express, passport) => {
  app.set('showStackError', true);
  app.set('port', process.env.PORT || 3000);
  app.set('view engine', 'pug');
  app.set('views', path.join(__dirname, '..', '..', 'client', 'views'));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(passport.initialize());
  app.use(
    '/js',
    browserify(path.join(__dirname, '..', '..', 'client', 'js'))
  );
  app.use(sassMiddleware({
    /* Options */
    src: path.join(__dirname, '..', '..', 'client', 'scss'),
    dest: path.join(__dirname, '..', 'public'),
    debug: true,
    outputStyle: 'compressed',
    prefix: '/',
    options: {
      compress: false,
      include: [
        './bower_components/../',
        './node_modules/../',
      ],
    },
  }));
  app.use(express.static(path.join(__dirname, '..', 'public')));
};
