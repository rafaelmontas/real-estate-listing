const express = require('express');
const agentsPublicRouter = express.Router();
const db =  require('../models');
const Agent = db.agent;
const Property = db.property;
const AgentProfilePicture = db.AgentProfilePicture;


agentsPublicRouter.get("/:id", (req, res) => {
  Agent.findByPk(req.params.id, {
    attributes: ['id', 'name', 'phone_number', 'alt_phone_number', [
      db.sequelize.fn('COUNT', db.sequelize.col('properties.id')), 'n_listings'
    ]],
    include: [{
      model: Property,
      attributes: [],
      where: {listing_active: true}
    },{model: AgentProfilePicture, attributes: ['location']}],
    group: ['agent.id', 'AgentProfilePicture.id']
  })
    .then(agent => {
      res.status(200).send(agent)
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500);
    });
})

module.exports = agentsPublicRouter;