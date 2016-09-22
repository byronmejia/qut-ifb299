const path = require('path');
const del = require('del');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: path.join(__dirname, "../temp/")});

//require key
let keys;

try {
  keys = require('../config/keys.json');
} catch(err) {
  console.log(err); // eslint-disable-line no-console
  keys = {
    s3: {
      russel: {
        secret: process.env.S3_SEC,
        bucket: process.env.S3_BUC
      }
    }
  };
}

//export this module
module.exports = (app, passport, jwt, jwtAuth, client, s3) => {
  //bork it
  app.post('/sendFile', upload.single('file'), (req, res) => {

    //get the uploaded image
    var stamp = String(new Date().getTime());

    //or atleast try too..
    try {
      var inputPath = req.file.path;
      var targetPath = path.join(__dirname, "../temp/" + stamp + path.extname(req.file.originalname).toLowerCase());
    } catch(err){
      res.render('profile', {
        error: "no file uploaded D:"
      });
      return;
    }

    //keep files under 2MB
    if(req.file.size/1000000 > 2){

      //render
      res.render('profile', {
        error: "please keep images under 2MB :)"
      });

      //delete file
      del([req.file.path]).then(paths => {});

      return;
    }

    //handle png's
    if (path.extname(req.file.originalname).toLowerCase() === '.png') {
      console.log("Stage 1: PNG");
       fs.rename(inputPath, targetPath, function(err) {
         (err)?console.log(err):console.log("Stage 1: Upload To Server Completed!");
       });
   }

   //handle jpg's
   else if (path.extname(req.file.originalname).toLowerCase() === '.jpg') {
     console.log("Stage 1: JPG");
      fs.rename(inputPath, targetPath, function(err) {
        (err)?console.log(err):console.log("Stage 1: Upload To Server Completed!");
      });
  }

   //handle gif's
   else if (path.extname(req.file.originalname).toLowerCase() === '.gif') {
     console.log("Stage 1: GIF");
      fs.rename(inputPath, targetPath, function(err) {
        (err)?console.log(err):console.log("Stage 1: Upload To Server Completed!");
      });
  }

   //non supported file
   else {
       fs.unlink(inputPath, function (err) {
           if(err)console.log("file unlink error");
           res.render('profile', {
             error: ".png's .jpg's .gif's only :) sorry!"
           });
       });
       return;
   }

    //upload file to remote
    var params = {
      localFile: targetPath,
      s3Params: {
        Bucket: keys.s3.russel.bucket,
        Key: keys.s3.russel.secret,
      },
    };

    //log the output for now
    var uploader = client.uploadFile(params);
    uploader.on('error', function(err) {
      console.error("Stage 2: Unable to upload:", err.stack);
    });
    uploader.on('progress', function() {
      console.log("Stage 2: Uploading " + parseInt(uploader.progressAmount/uploader.progressTotal*100) + "%");
    });
    uploader.on('end', function() {
      console.log("Stage 2: Done uploading");

      //delete the file locally
      del([targetPath]).then(paths => {
        console.log("Stage 3: Deleted " + targetPath);
      });

      //get photo link signed
      var resultLink = s3.getPublicUrlHttp(keys.s3.russel.bucket,keys.s3.russel.secret);
      console.log("Stage 3: " + resultLink);

      //save link to user in database


      //render profile with image
      res.render('profile', {
        pic: resultLink
      });

    });

  });
}
