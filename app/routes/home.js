/**
 * Created by byron on 30/07/2016.
 */

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('Hello heroku');
  });
};
