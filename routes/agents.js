const express = require('express');
const agentsRouter = express.Router();
const db =  require('../models');
const Agent = db.agent;
const Property = db.property;
const Sequelize = require('sequelize');
const Op = Sequelize.Op

agentsRouter.get("/:id", (req, res) => {
  Agent.findByPk(req.params.id, {include: Property})
        .then(agent => {
          res.status(200).send(agent)
        })
        .catch(err => {
          console.log(err)
          res.sendStatus(500);
        });
})


module.exports = agentsRouter;