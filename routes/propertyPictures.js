const express = require('express')
const db =  require('../models')
const PropertyPictures = db.PropertyPictures
const propertyPicturesRouter = express.Router({mergeParams: true})



propertyPicturesRouter.post('/', (req, res) => {
  console.log('pictures requested!')
  res.status(200).json('pictures requested')
})



module.exports = propertyPicturesRouter