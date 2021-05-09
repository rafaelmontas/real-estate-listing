const express = require('express');
const agentLeadsRouter = express.Router();
const db =  require('../models');
const AgentLeads = db.AgentLeads;


agentLeadsRouter.post("/", async (req, res) => {
  console.log(req.body)

  try {
    await AgentLeads.create(req.body)
    console.log('lead created')
    res.status(201).json({msg: 'Solicitud enviada.'})
  } catch (err) {
    console.log(err)
    res.status(400).json({msg: 'Algo salió mal'})
  }

})

module.exports = agentLeadsRouter;