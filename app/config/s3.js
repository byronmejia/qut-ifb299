const s3 = require('s3');

let keys;

try {
  keys = require('./keys.json');
} catch(err) {
  console.log(err); // eslint-disable-line no-console
  keys = {
    s3: {
      russel: {
        id: process.env.S3_ID,
        secret: process.env.S3_SEC,
        region: process.env.S3_REG
      }
    }
  };
}

module.exports.s3 = s3;
module.exports.client = s3.createClient({
  maxAsyncS3: 20,
  s3RetryCount: 3,
  s3RetryDelay: 1000,

  //This is 20MB
  multipartUploadThreshold: 20971520,

  //This is 15MB
  multipartUploadSize: 15728640,

  s3Options: {
    accessKeyId: keys.s3.russel.id,
    secretAccessKey: keys.s3.russel.secret,
    region: keys.s3.russel.region,
  }
});