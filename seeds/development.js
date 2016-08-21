const path = require('path');
const modelPath = path.join(__dirname, '..', 'app', 'models');
const Login = require(path.join(modelPath, 'login.js'));

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('logins').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        new Login({username: 'admin', password: 'password'})
          .save()
      ]);
    });
};
