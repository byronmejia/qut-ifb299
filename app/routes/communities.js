/**
 * Created by byron on 8/09/16.
 */
const path = require('path');

const Communities = require(path.join('..', 'models', 'Community.js'));
const stripe = require(path.join('..', 'config', 'stripe.js')).stripe;

const keyPath = path.join('..', 'config', 'keys.json');

let keys;

try {
  keys = require(keyPath); // eslint-disable-line
} catch (err) {
  console.log(err); // eslint-disable-line no-console
  keys = {
    stripe: {
      test: {
        publish: process.env.ST_TEST_PUB,
        secret: process.env.ST_TEST_SEC,
      },
      live: {
        publish: process.env.ST_LIVE_PUB,
        secret: process.env.ST_LIVE_SEC,
      },
    },
  };
}

module.exports = (app, passport, jwt, jwtAuth) => {
  app.get('/communities', jwtAuth, (req, res) => {
    res.render('app/communities');
  });

  app.get('/api/communities', jwtAuth, (req, res) => {
    Communities.fetchAll().then((data) =>
      res.json(data)
    );
  });

  app.get('/communities/:id/donate', jwtAuth, (req, res) => {
    Communities.where({ id: req.params.id }).fetch()
      .then((data) => {
        res.render(
          'app/communities/donate', { community: data, stripe_pub: keys.stripe.test.publish }
          );
      });
  });

  app.post('/communities/:id/donate', jwtAuth, (req, res) => {
    const amount = parseFloat(req.body.finalAmount).toFixed(2);
    const token = req.body.stripeToken;

    if (isNaN(amount)) res.render('app/communities/donate/error');

    stripe.charges.create({
      amount,
      currency: 'aud',
      source: token,
      description: 'Charge for sofia.smith@example.com',
    }, (err, charge) => {
      if (!err) {
        console.log(charge);
        res.render('app/communities/donate/thank-you');
      } else res.render('app/communities/donate/error');
    });
  });
};
