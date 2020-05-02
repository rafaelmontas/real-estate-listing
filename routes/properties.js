const express = require('express');
const propertiesRouter = express.Router();
const db =  require('../models');
const Property = db.property;

const properties = require("../data");

propertiesRouter.get("/", (req, res) => {
  Property.findAll().then(properties => {
    res.status(200).send(properties);
  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
})


module.exports = propertiesRouter;