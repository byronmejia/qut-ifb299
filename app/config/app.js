/**
 * Created by byron on 21/08/2016.
 */
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sassMiddleware = require('node-sass-middleware');

module.exports = (app, path, express, passport) => {
  app.set('showStackError', true);
  app.set('port', process.env.PORT || 3000);
  app.set('view engine', 'pug');
  app.set('views', path.join(__dirname, '..', 'views'));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, '..', 'public')));
  app.use(passport.initialize());
  app.use(sassMiddleware({
    /* Options */
    src: path.join(__dirname, '..', 'assets', 'scss'),
    dest: path.join(__dirname, '..', 'public'),
    debug: true,
    outputStyle: 'compressed',
    prefix: '/assets',
    options: {
      compress: false,
      include: [
        './bower_components/../',
        './node_modules/../',
      ],
    },
  }));
};
