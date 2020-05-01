const express = require('express');
const propertiesRouter = express.Router();
const Property =  require('../models/Property');

const properties = require("../data");

propertiesRouter.get("/", (req, res) => {
  res.status(200).send(properties);
})

propertiesRouter.get("/search", (req, res) => {
  Property.findAll().then(properties => {
    console.log(properties);
    res.sendStatus(200);
  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
})


module.exports = propertiesRouter;