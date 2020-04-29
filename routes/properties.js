const express = require('express');
const propertiesRouter = express.Router();

propertiesRouter.get("/", (req, res) => {
  res.sendStatus(200);
})


module.exports = propertiesRouter;