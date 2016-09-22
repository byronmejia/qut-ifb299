/**
 * Created by byron on 8/09/16.
 */
const path = require('path');

const Communities = require(path.join('..', 'models', 'Community.js'));
const Charges = require(path.join('..', 'models', 'Charges.js'));
const stripe = require(path.join('..', 'config', 'stripe.js')).stripe;
const getCurrentProfile = require(path.join('..', 'helper', 'getCurrentProfile.js'));

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

const Relationship = require(
  path.join(__dirname, '..', 'models', 'RelationshipProfileCommunity.js')
);

module.exports = (app, passport, jwt, jwtAuth) => {
  app.get('/communities/create', jwtAuth, (req, res) =>
    res.render('app/communities/new')
  );

  app.get('/communities', jwtAuth, (req, res) => {
    res.render('app/communities/all');
  });

  app.get('/community/:id', jwtAuth, (req, res) => {
    Communities.where({
      id: req.params.id,
    }).fetch({
      require: true,
    }).then((data) => {
      res.render('app/communities/index', {
        community: data.attributes,
      });
    });
  });

  app.get('/community/:id/join', jwtAuth, (req, res) => {
    getCurrentProfile(req).then((id) => {
      new Relationship({
        community_id: req.params.id,
        profile_id: id,
      }).save().then(() => {
        res.redirect('/communities');
      });
    });
  });

  app.get('/community/:id/edit', jwtAuth, (req, res) => {
    Communities.where({
      id: req.params.id,
    }).fetch({
      require: true,
    }).then((data) => {
      res.render('app/communities/edit', {
        community: data.attributes,
      });
    });
  });

  app.post('/community/:id/edit/success', jwtAuth, (req, res) => {
    Communities.where({
      id: req.params.id,
    }).save({
      name: req.body.community_name,
      profile_picture: null,
      description: req.body.community_desc,
      location: req.body.community_location,
    }, {
      patch: true,
    }).then(() => {
      res.redirect('/communities');
    });
  });

  app.get('/community/:id/donate', jwtAuth, (req, res) => {
    Communities.where({ id: req.params.id }).fetch()
      .then((data) => {
        res.render(
          'app/communities/donate/index', { community: data, stripe_pub: keys.stripe.test.publish }
          );
      });
  });

  app.post('/community/:id/donate', jwtAuth, (req, res) => {
    let amount = parseFloat(req.body.finalAmount).toFixed(2);
    const token = req.body.stripeToken;
    amount = Math.round(amount * 100);

    if (isNaN(amount)) res.render('app/communities/donate/amount_error');

    stripe.charges.create({
      amount,
      currency: 'aud',
      source: token,
      description: 'Charge for Coterie Online',
    }, (err, charge) => {
      if (!err) {
        Communities.where({ id: req.params.id })
          .fetch()
          .then((community) => {
            new Charges({
              id: charge.id,
              community_id: community.attributes.id,
            }).save(null, { method: 'insert' });
            new Communities({
              id: community.attributes.id,
              currentAmount: community.attributes.currentAmount + amount,
            }).save();
          })
          .then(() => {
            res.render('app/communities/donate/thank-you');
          });
      } else res.render('app/communities/donate/stripe_error');
    });
  });
};
