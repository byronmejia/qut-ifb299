const path = require('path');

const modelPath = path.join(__dirname, '..', 'app', 'models');
const Login = require(path.join(modelPath, 'Login.js'));
const Profile = require(path.join(modelPath, 'Profile.js'));
const Community = require(path.join(modelPath, 'Community.js'));
const Event = require(path.join(modelPath, 'Event.js'));
const Location = require(path.join(modelPath, 'Location.js'));
const RelationshipProfileCommunity = require(path.join(modelPath, 'RelationshipProfileCommunity.js'));
const RelationshipRsvpEventProfile = require(path.join(modelPath, 'RelationshipRsvpEventProfile.js'));
const Rsvp = require(path.join(modelPath, 'Rsvp.js'));

function seedLocations(knex, Promise) {
  return knex('locations').truncate().then(() => Promise.all([
    new Location({
      lat: -38.694892,
      lon: 143.32371,
      locationName: 'Google Chrome',
    }).save(),
    new Location({
      lat: -19.257363,
      lon: 146.566488,
      locationName: 'Mozilla FireFox',
    }).save(),
    new Location({
      lat: -38.56326,
      lon: 142.910132,
      locationName: 'ThoughtWorks',
    }).save(),
    new Location({
      lat: -33.472042,
      lon: 151.143346,
      locationName: 'University of Queensland',
    }).save(),
    new Location({
      lat: -36.412396,
      lon: 139.901255,
      locationName: 'Technology One',
    }).save(),
  ]));
}

function seedLogins(knex, Promise) {
  return knex('logins').truncate().then(() => Promise.all([
    new Login({
      username: 'admin',
      password: 'password',
    }).save(),
    new Login({
      username: '12345',
      password: 'password',
    }).save(),
    new Login({
      username: 'dragon',
      password: 'password',
    }).save(),
    new Login({
      username: 'football',
      password: 'password',
    }).save(),
    new Login({
      username: 'baseball',
      password: 'password',
    }).save(),
  ]));
}

function seedProfiles(knex, Promise) {
  return knex('profiles').truncate().then(() => (Promise.all([
    Login.where({ username: 'admin' }).fetch()
      .then(
        (login) =>
        new Profile({
          firstName: 'Matilda',
          lastName: 'Benson',
          email: 'MatildaBenson@teleworm.us',
          mobile: '0453413742',
          bio: 'My favourite colour is Orange',
          login_id: login.attributes.id,
        }).save()
      ),

    Login.where({ username: '12345' }).fetch()
      .then(
        (login) =>
        new Profile({
          firstName: 'Nicholas',
          lastName: 'Shenton',
          email: 'NicholasShenton@armyspy.com ',
          mobile: '0440790214',
          bio: 'My favourite colour is Black',
          login_id: login.attributes.id,
        }).save()
      ),

    Login.where({ username: 'dragon' }).fetch()
      .then(
        (login) =>
          new Profile({
            firstName: 'Luca',
            lastName: 'Alder',
            email: 'LucaAlder@dayrep.com',
            mobile: '0453859974',
            bio: 'My favourite colour is Blue',
            login_id: login.attributes.id,
          }).save()
      ),

    Login.where({ username: 'football' }).fetch()
      .then(
        (login) =>
          new Profile({
            firstName: 'David',
            lastName: 'Creswell',
            email: 'DavidCreswell@dayrep.com',
            mobile: '0489419791',
            bio: 'My favourite colour is Purple',
            login_id: login.attributes.id,
          }).save()
      ),

    Login.where({ username: 'baseball' }).fetch()
      .then(
        (login) =>
          new Profile({
            firstName: 'Kate',
            lastName: 'Waterfield',
            email: 'KateWaterfield@dayrep.com',
            mobile: '0487367226',
            bio: 'My favourite colour is Purple',
            login_id: login.attributes.id,
          }).save()
      ),
  ])));
}

function seedCommunities(knex, Promise) {
  return knex('communities').truncate().then(() => Promise.all([
    Location.where({ locationName: 'Google Chrome' }).fetch()
      .then(
        (location) =>
          new Community({
            name: 'Erlang Anonymous',
            profile_picture: 'http://lorempixel.com/100/100',
            description: 'A place for helping Erlang addicts',
            location: location.attributes.id,
          }).save()
      ),
    Location.where({ locationName: 'Mozilla FireFox' }).fetch()
      .then(
        (location) =>
          new Community({
            name: 'Ruby Anonymous',
            profile_picture: 'http://lorempixel.com/100/100',
            description: 'A place for helping ruby addicts',
            location: location.attributes.id,
          }).save()
      ),
    Location.where({ locationName: 'ThoughtWorks' }).fetch()
      .then(
        (location) =>
          new Community({
            name: 'Javascript Anonymous',
            profile_picture: 'http://lorempixel.com/100/100',
            description: 'A place for helping javascript addicts',
            location: location.attributes.id,
          }).save()
      ),
    Location.where({ locationName: 'University of Queensland' }).fetch()
      .then(
        (location) =>
          new Community({
            name: 'Facebook Anonymous',
            profile_picture: 'http://lorempixel.com/100/100',
            description: 'A place for Facebook addicts',
            location: location.attributes.id,
          }).save()
      ),
    Location.where({ locationName: 'Technology One' }).fetch()
      .then(
        (location) =>
          new Community({
            name: 'Buffalo Anonymous',
            profile_picture: 'http://lorempixel.com/100/100',
            description: 'A place for Buffalo teachers',
            location: location.attributes.id,
          }).save()
      ),
  ]));
}

function seedOneProfileCommunityRelationship(loginAttr, communityAttr, Promise) {
  Profile.where({ login_id: login.attributes.id }).fetch(),
    Community.where({ name: communityAttr }).fetch(),
  return Login.where({ username: loginAttr }).fetch()
    .then(
      (login) => {
        
      }
    );
}

function seedProfileCommunityRelationship(knex, Promise) {
  return Promise.all([
    seedOneProfileCommunityRelationship('admin', 'Erlang Anonymous', Promise),
    // new RelationshipProfileCommunity({
    //   profile_id: Profile
    //     .where({ login_id: Login.where({ username: 'admin' })
    //       .fetch().attributes.id })
    //     .fetch().attributes.id,
    //   community_id: Community.where({ name: 'Erlang Anonymous' }).fetch().attributes.id,
    // }).save(),
    // new RelationshipProfileCommunity({
    //   profile_id: Profile
    //     .where({ login_id: Login.where({ username: 'admin' })
    //       .fetch().attributes.id })
    //     .fetch().attributes.id,
    //   community_id: Community.where({ name: 'Ruby Anonymous' }).fetch().attributes.id,
    // }).save(),
    // new RelationshipProfileCommunity({
    //   profile_id: Profile.where({ login_id: Login.where({ username: 'admin' })
    //     .fetch().attributes.id })
    //     .fetch().attributes.id,
    //   community_id: Community.where({ name: 'Javascript Anonymous' }).fetch().attributes.id,
    // }).save(),
    // new RelationshipProfileCommunity({
    //   profile_id: Profile
    //     .where({ login_id: Login.where({ username: 'admin' })
    //       .fetch().attributes.id })
    //     .fetch().attributes.id,
    //   community_id: Community.where({ name: 'Facebook Anonymous' }).fetch().attributes.id,
    // }).save(),
    // new RelationshipProfileCommunity({
    //   profile_id: Profile.where({ login_id: Login.where({ username: 'admin' })
    //     .fetch().attributes.id })
    //     .fetch().attributes.id,
    //   community_id: Community.where({ name: 'Buffalo Anonymous' }).fetch().attributes.id,
    // }).save(),
  ]);
}

exports.seed = function generateSeeds(knex, Promise) {
  return Promise.all([
    seedLogins(knex, Promise),
    seedLocations(knex, Promise),
  ]).then(
    () => Promise.all([
      seedProfiles(knex, Promise),
      seedCommunities(knex, Promise),
    ]).then(
      () => Promise.all([
        seedProfileCommunityRelationship(knex, Promise),
      ])
    )
  );

    // .then(seedProfiles(knex, Promise));
    //
    // .then(seedProfileCommunityRelationship(knex, Promise));
};
