const path = require('path');
const del = require('del');
const fs = require('fs');
const multer = require('multer');

const upload = multer({ dest: path.join(__dirname, '../temp/') });

// require key
let keys;

try {
  keys = require('../config/keys.json'); // eslint-disable-line
} catch (err) {
  keys = {
    s3: {
      russel: {
        secret: process.env.S3_SEC,
        bucket: process.env.S3_BUC,
      },
    },
  };
}

// export this module
module.exports = (app, passport, jwt, jwtAuth, client, s3) => {
  // bork it
  app.post('/sendFile', upload.single('file'), (req, res) => {
    // get timestamp for file name
    const stamp = String(new Date().getTime());

    // get the uploaded image
    let inputPath;
    let targetPath;

    // or atleast try too..
    try {
      inputPath = req.file.path;
      targetPath = path.join(__dirname, '../temp/', stamp,
      path.extname(req.file.originalname).toLowerCase());
    } catch (err) {
      res.render('profile', {
        error: 'no file uploaded D:',
      });
      return;
    }

    // keep files under 2MB
    if (req.file.size / 1000000 > 2) {
      // render
      res.render('profile', {
        error: 'please keep images under 2MB :)',
      });

      // delete file
      del([req.file.path]);

      return;
    }

    // handle formats
    const extname = path.extname(req.file.originalname).toLowerCase();
    if (extname === '.png') fs.rename(inputPath, targetPath);
    else if (extname === '.jpg') fs.rename(inputPath, targetPath);
    else if (extname === '.gif') fs.rename(inputPath, targetPath);

   // non supported file
    else {
      fs.unlink(inputPath, () => {
        res.render('profile', {
          error: '.png\'s .jpg\'s .gif\'s only :) sorry!',
        });
      });
      return;
    }

    // upload file to remote
    const params = {
      localFile: targetPath,
      s3Params: {
        Bucket: keys.s3.russel.bucket,
        Key: keys.s3.russel.secret,
      },
    };

    // create uploader
    const uploader = client.uploadFile(params);

    // file couldnt upload
    uploader.on('error', () => {
      // delete the file locally
      del([targetPath]);

      res.render('profile', {
        error: "Couldn't Upload :(",
      });
    });

    // file is uploading
    uploader.on('progress', () => {
      // var percentage = uploader.progressAmount / uploader.progressTotal * 100;
    });

    // file is done
    uploader.on('end', () => {
      // delete the file locally
      del([targetPath]);

      // get photo link signed
      const resultLink = s3.getPublicUrlHttp(keys.s3.russel.bucket, keys.s3.russel.secret);

      // save link to user in database
      // TODO

      // render profile with image
      res.render('profile', {
        pic: resultLink,
      });
    });
  });
};
