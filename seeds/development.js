const Login = require('../app/server/models/Login');
const Profile = require('../app/server/models/Profile');
const Community = require('../app/server/models//Community');
const Event = require('../app/server/models/Event');
const Location = require('../app/server/models/Location');
const RelationshipProfileCommunity = require('../app/server/models/RelationshipProfileCommunity');
// TODO: const RelationshipRsvpEventProfile =
// require('../app/server/models/RelationshipRsvpEventProfile');
// TODO: const Rsvp = require('../app/server/models/Rsvp');

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
        login =>
        new Profile({
          firstName: 'Tylor',
          lastName: 'Stewart',
          email: 'trjstewart@gmail.com',
          mobile: '0413192125',
          bio: 'My favourite colour is Orange',
          login_id: login.attributes.id,
          notifications: 'email',
        }).save()
      ),

    Login.where({ username: '12345' }).fetch()
      .then(
        login =>
        new Profile({
          firstName: 'Nicholas',
          lastName: 'Shenton',
          email: 'NicholasShenton@armyspy.com ',
          mobile: '0440790214',
          bio: 'My favourite colour is Black',
          login_id: login.attributes.id,
          notifications: 'email',
        }).save()
      ),

    Login.where({ username: 'dragon' }).fetch()
      .then(
        login =>
          new Profile({
            firstName: 'Luca',
            lastName: 'Alder',
            email: 'LucaAlder@dayrep.com',
            mobile: '0453859974',
            bio: 'My favourite colour is Blue',
            login_id: login.attributes.id,
            notifications: 'email',
          }).save()
      ),

    Login.where({ username: 'football' }).fetch()
      .then(
        login =>
          new Profile({
            firstName: 'David',
            lastName: 'Creswell',
            email: 'DavidCreswell@dayrep.com',
            mobile: '0489419791',
            bio: 'My favourite colour is Purple',
            login_id: login.attributes.id,
            notifications: 'email',
          }).save()
      ),

    Login.where({ username: 'baseball' }).fetch()
      .then(
        login =>
          new Profile({
            firstName: 'Kate',
            lastName: 'Waterfield',
            email: 'KateWaterfield@dayrep.com',
            mobile: '0487367226',
            bio: 'My favourite colour is Purple',
            login_id: login.attributes.id,
            notifications: 'email',
          }).save()
      ),
  ])));
}

function seedCommunities(knex, Promise) {
  return knex('communities').truncate().then(() => Promise.all([
    Location.where({ locationName: 'Google Chrome' }).fetch()
      .then(
        location =>
          new Community({
            name: 'Erlang Anonymous',
            profile_picture: 'http://lorempixel.com/100/100',
            description: 'A place for helping Erlang addicts',
            location: location.attributes.id,
          }).save()
      ),
    Location.where({ locationName: 'Mozilla FireFox' }).fetch()
      .then(
        location =>
          new Community({
            name: 'Ruby Anonymous',
            profile_picture: 'http://lorempixel.com/100/100',
            description: 'A place for helping ruby addicts',
            location: location.attributes.id,
          }).save()
      ),
    Location.where({ locationName: 'ThoughtWorks' }).fetch()
      .then(
        location =>
          new Community({
            name: 'Javascript Anonymous',
            profile_picture: 'http://lorempixel.com/100/100',
            description: 'A place for helping javascript addicts',
            location: location.attributes.id,
          }).save()
      ),
    Location.where({ locationName: 'University of Queensland' }).fetch()
      .then(
        location =>
          new Community({
            name: 'Facebook Anonymous',
            profile_picture: 'http://lorempixel.com/100/100',
            description: 'A place for Facebook addicts',
            location: location.attributes.id,
          }).save()
      ),
    Location.where({ locationName: 'Technology One' }).fetch()
      .then(
        location =>
          new Community({
            name: 'Buffalo Anonymous',
            profile_picture: 'http://lorempixel.com/100/100',
            description: 'A place for Buffalo teachers',
            location: location.attributes.id,
          }).save()
      ),
  ]));
}

function seedEvents(knex, Promise) {
  return knex('events')
  .truncate().then(
    () => Promise.all([
      new Event({
        name: 'UX Meetup',
        description: 'My favourite colour is black',
        startTime: Date.now(),
        endTime: (Date.now() + (2 * 60 * 60 * 1000)),
        location_id: 1,
        community_id: 1,
      }).save(),
      new Event({
        name: 'UQCS Meetup',
        description: 'My favourite colour is purple',
        startTime: Date.now(),
        endTime: (Date.now() + (2 * 60 * 60 * 1000)),
        location_id: 2,
        community_id: 2,
      }).save(),
      new Event({
        name: 'JDP Meetup',
        description: 'My favourite colour is lambda',
        startTime: Date.now(),
        endTime: (Date.now() + (2 * 60 * 60 * 1000)),
        location_id: 3,
        community_id: 3,
      }).save(),
    ])
  );
}

function seedOneProfileCommunityRelationship(loginAttr, communityAttr) {
  return Login.where({ username: loginAttr }).fetch()
    .then(
      login => Profile
        .where(
          { login_id: login.attributes.id }
          ).fetch().then(profile => profile)
    )
    .then(
      profile => Community
        .where(
          { name: communityAttr }
        ).fetch().then((community) => {
          const data = {};
          data.community = community;
          data.profile = profile;
          return data;
        })
    )
    .then(
      data => new RelationshipProfileCommunity({
        profile_id: data.profile.attributes.id,
        community_id: data.community.attributes.id,
      }).save()
    );
}

function seedProfileCommunityRelationship(knex, Promise) {
  const users = ['admin', '12345', 'dragon', 'football', 'baseball'];
  const communities = ['Erlang Anonymous', 'Ruby Anonymous',
    'Javascript Anonymous', 'Facebook Anonymous', 'Buffalo Anonymous'];
  const promises = [];

  users.forEach(user =>
    communities.forEach(community =>
      promises.push(seedOneProfileCommunityRelationship(user, community))));

  return knex('profile_community_relationship').truncate()
    .then(() => Promise.all(promises));
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
        seedEvents(knex, Promise),
      ])
    )
  );
};
