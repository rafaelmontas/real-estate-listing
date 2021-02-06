const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const agentsProfilePicturesRouter = express.Router({mergeParams: true});

const s3 = new aws.S3()

// Init Upload
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'agents-profile-pictures',
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, {fieldName: file.fieldname, agentId: req.params.id})
    },
    key: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-')
      cb(null, req.params.id + '-' + Date.now() + '-' + fileName)
    }
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      return cb(null, true)
    } else {
      cb('Solo se permite imagen con formato .png, .jpg o .jpeg!');
    }
  }
}).single('profileImg')


agentsProfilePicturesRouter.post('/', (req, res) => {
  upload(req, res, (err) => {
    if(err) {
      return res.status(400).json({msg: err})
    } 
    console.log(req.file)
    res.status(200).json({msg: 'Foto de perfil actualizada!', file: req.file.location})
  })
})

module.exports = agentsProfilePicturesRouter;