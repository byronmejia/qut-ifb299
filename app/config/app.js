/**
 * Created by byron on 21/08/2016.
 */
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

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
};
