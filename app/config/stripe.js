let keys;

try {
  keys = require('./keys.json'); // eslint-disable-line
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

const stripe = require('stripe')(
  keys.stripe.test.secret
);

module.exports.stripe = stripe;
