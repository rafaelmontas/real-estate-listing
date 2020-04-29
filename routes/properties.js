const express = require('express');
const propertiesRouter = express.Router();
const properties = require("../data");

propertiesRouter.get("/", (req, res) => {
  res.status(200).send(properties);
})


module.exports = propertiesRouter;