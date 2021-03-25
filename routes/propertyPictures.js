const express = require('express')
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const db =  require('../models')
const PropertyPictures = db.PropertyPictures
const propertyPicturesRouter = express.Router({mergeParams: true})

const s3 = new aws.S3()

// Init Upload
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'properties-pictures',
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, {fieldName: file.fieldname, propertyId: req.params.id})
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
}).array('listing-pictures')


propertyPicturesRouter.post('/', (req, res) => {
  upload(req, res, (err) => {
    if(err) {
      return res.status(400).json({msg: err})
    }

    req.files.forEach(item => {
      item.original_name = item.originalname
      item.storage_class = item.storageClass
      item.property_id = req.params.id

      delete item.fieldname
      delete item.originalname
      delete item.storageClass
      delete item.contentType
      delete item.contentDisposition
      delete item.serverSideEncryption
      delete item.metadata
      delete item.etag
      delete item.versionId
    })
    console.log(req.files)
    PropertyPictures.bulkCreate(req.files, {returning: true})
    .then(data => {
      console.log('fotos cargadas', req.files, data)
      res.status(200).json({msg: 'Fotos cargadas!'})
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({msg: err})
    })
  })
})

propertyPicturesRouter.delete('/', async (req, res) => {
  console.log(req.body.ids)
  try {
    await PropertyPictures.destroy({where: {id: req.body.ids}})
    res.status(200).json({msg: 'Fotos eliminadas!'})
  } catch(err) {
    res.status(400).json({msg: err})
  }
})



module.exports = propertyPicturesRouter