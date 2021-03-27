const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const db =  require('../models');
const AgentProfilePicture = db.AgentProfilePicture
const agentsProfilePicturesRouter = express.Router({mergeParams: true});

const s3 = new aws.S3()

// Init Upload
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.NODE_ENV === 'production' ? 'agent-profile-pictures-production' : 'agents-profile-pictures',
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

    const pictureData = {
      original_name: req.file.originalname,
      encoding: req.file.encoding,
      mimetype: req.file.mimetype,
      size: req.file.size,
      bucket: req.file.bucket,
      key: req.file.key,
      acl: req.file.acl,
      storage_class: req.file.storageClass,
      location: req.file.location,
      agent_id: req.params.id
    }

    AgentProfilePicture.upsert(pictureData, {where: {agent_id: req.params.id}, returning: true})
                       .then(data => {
                         console.log(data[0].dataValues)
                         res.status(200).json({msg: 'Foto de perfil actualizada!', file: data[0].dataValues.location})
                       })
                       .catch(err => {
                        // console.log(err.errors[0].message)
                        res.status(400).json({msg: err})
                       })
  })
})

module.exports = agentsProfilePicturesRouter;