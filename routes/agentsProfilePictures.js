const express = require('express');
const multer = require('multer');
const path = require('path');
const agentsProfilePicturesRouter = express.Router({mergeParams: true});

// Set Storage Engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/')
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-')
    cb(null, Date.now() + '-' + fileName)
  }
})

// Init Upload
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true)
    } else {
      cb(null, false);
      return cb(new Error());
    }
  }
}).single('profileImg')


agentsProfilePicturesRouter.post('/', (req, res) => {
  upload(req, res, (err) => {
    if(err) {
      return res.status(400).json({msg: 'Solo se permite imagen con formato .png, .jpg o .jpeg!'})
    } 
    console.log(req.file)
    res.status(200).json({msg: 'uploaded'})
  })
})

module.exports = agentsProfilePicturesRouter;