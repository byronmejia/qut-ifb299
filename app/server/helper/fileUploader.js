const path = require('path');
const del = require('del');
const fs = require('fs');

// To use this module incorporate the following into your route
// const multer = require('multer');
// const upload = multer({ dest: path.join(__dirname, '../temp/')});
// app.post('path', upload.array('files'), (req,res)

// export this module
module.exports.upload = function upload(app, req, params, callback) {
  // upload parameters
  const fileAmount = (params.fileAmount) ? params.fileAmount : 2;
  const maxFileSize = (params.maxFileSize) ? params.maxFileSize : 2;
  const bucketName = (params.bucketName) ? params.bucketName : 'default';

  // get the finest ingredients this nation has
  const s3 = req.app.get('s3');
  const client = req.app.get('s3Client');

  // get timestamp for file name
  const stamp = String(new Date().getTime());

  // get the uploaded images
  const inputPath = [];
  const targetPath = [];
  const resultImages = [];

  let filesUploaded = 0;

  if (req.files.length < fileAmount) { callback(null, ['Minimum ', String(fileAmount), ' images.']); return; }

  for (let i = 0; i < req.files.length; i += 1) {
    //  * * * * BEGIN LOCAL * * * *

    // or atleast try too..
    try {
      inputPath.push(req.files[i].path);
      targetPath.push(path.join(__dirname, '../temp/', String(stamp) + String(i) +
      path.extname(req.files[i].originalname).toLowerCase()));
    } catch (err) {
      // delete files
      for (let deleteIndex = 0; deleteIndex < req.files.length; deleteIndex += 1) {
        del(req.files[deleteIndex].path);
      }

      callback(null, ['No File Uploaded']);

      return;
    }

    // size checking
    if (req.files[i].size / 1000000 > maxFileSize) {
      // delete files
      for (let deleteIndex = 0; deleteIndex < req.files.length; deleteIndex += 1) {
        del(req.files[deleteIndex].path);
      }

      callback(null, ['Please Keep Images Under ', String(maxFileSize), 'MB']);

      return;
    }

    // handle formats
    const extname = path.extname(req.files[i].originalname).toLowerCase();
    if (extname === '.png') fs.renameSync(inputPath[i], targetPath[i]);
    else if (extname === '.jpg') fs.renameSync(inputPath[i], targetPath[i]);
    else if (extname === '.gif') fs.renameSync(inputPath[i], targetPath[i]);

    // non supported file
    else {
      // delete files
      for (let deleteIndex = 0; deleteIndex < req.files.length; deleteIndex += 1) {
        del(req.files[deleteIndex].path);
      }

      callback(null, ['.png\'s .jpg\'s .gif\'s only!']);

      return;
    }

    //  * * * * BEGIN S3  * * * *


    // uploader parameters
    const uploaderParams = {
      localFile: targetPath[i],
      s3Params: {
        Bucket: bucketName,
        Key: path.basename(targetPath[i]),
      },
    };

    // create uploader
    const uploader = client.uploadFile(uploaderParams);

    // file couldnt upload
    uploader.on('error', () => {
      // delete the files locally for now
      for (let deleteIndex = 0; deleteIndex < targetPath.length; deleteIndex += 1) {
        del(targetPath[deleteIndex]);
      }
    });

    // file is uploading
    uploader.on('progress', () => {
      // TODO This could be sent over as json
      // var percentage = uploader.progressAmount / uploader.progressTotal * 100;
    });

    // file is done
    uploader.on('end', () => { // eslint-disable-line no-loop-func
      filesUploaded += 1;

      // once all files are uploaded
      if (filesUploaded === req.files.length) {
        // get the links for every file
        for (let urlIndex = 0; urlIndex < targetPath.length; urlIndex += 1) {
          resultImages.push(s3.getPublicUrlHttp(bucketName, path.basename(targetPath[i])));
        }

        // check if the links match length
        if (resultImages.length === req.files.length) {
          // delete the files locally for now
          for (let deleteIndex = 0; deleteIndex < targetPath.length; deleteIndex += 1) {
            del(targetPath[deleteIndex]);
          }

          // finish
          callback(resultImages);
        }
      }
    });
  } // end file loop
}; // module export
