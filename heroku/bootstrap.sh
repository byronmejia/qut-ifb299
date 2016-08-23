node heroku/keygen.js
knex migrate:latest
knex seed:run development
export SECRET_KEY=$( cat app/config/secret.key )
