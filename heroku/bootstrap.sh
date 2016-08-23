node heroku/keygen.js
knex migrate:latest
knex seed:run development
heroku config:set SECRET_KEY=$( cat app/config/secret.key )
