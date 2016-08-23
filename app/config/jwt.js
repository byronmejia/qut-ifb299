const fs = require('fs');
const path = require('path');
const jwt = require('jwt-simple');
const secret = fs.readFileSync(
  path.join(__dirname, 'secret.key'), 'utf8'
);

console.log(secret);
