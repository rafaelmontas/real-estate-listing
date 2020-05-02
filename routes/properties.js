const express = require('express');
const propertiesRouter = express.Router();
const db =  require('../models');
const Property = db.property;


// @route GET /properties/
// @desc Get All Properties
// @access Public
propertiesRouter.get("/", (req, res) => {
  Property.findAll().then(properties => {
    res.status(200).send(properties);
  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
})

// @route GET /properties/:id
// @desc Get One Property
// @access Public
propertiesRouter.get("/:id", (req, res) => {
  Property.findByPk(req.params.id)
            .then(property => {
              res.status(200).send(property)
            })
            .catch(err => {
              console.log(err);
              res.sendStatus(500);
            });
})


module.exports = propertiesRouter;