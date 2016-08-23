const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const token = crypto.randomBytes(256).toString('hex');
const tokenPath = path.join(__dirname, '..', 'app', 'config', 'secret.key');

fs.writeFile(tokenPath, token, err => {
  if (err) return console.log(err);
  return console.log('New Key is Saved!!');
});
