const express = require('express');
const agentAuthRouter = express.Router();
const db =  require('../models');
const Agent = db.agent;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verifyToken = require('../middleware/agentAuth')


// @route POST /agent-auth
// @desc Auth agent
// @acces Public
agentAuthRouter.post("/", async (req, res) => {
  const { email, password } = req.body
  console.log(req.body)
  // Check if email doesn't exist
  const agent = await Agent.findOne({ where: { email } })
  if(!agent) return res.status(400).json({msg: 'Email incorrecto'})

  // Check if password is correct
  const validPass = await bcrypt.compare(password, agent.password)
  if(!validPass) return res.status(400).json({msg: 'Contraseña incorrecta'})

   // Create and assign token
   const token = jwt.sign({id: agent.id}, process.env.TOKEN_SECRET,  { expiresIn: '2d' })
   
   res.json({ token, agent: {id: agent.id, name: agent.name, email: agent.email} })
})


// @route GET /agent-auth/agent
// @desc Get agent data
// @acces Private
agentAuthRouter.get("/agent", verifyToken, (req, res) => {
  Agent.findByPk(req.agent.id)
        .then(agent => {
          console.log(req.agent)
          res.status(200).json({id: agent.id, name: agent.name, email: agent.email})
        })
        .catch(err => {
          console.log(err)
          res.sendStatus(500);
        });
})

module.exports = agentAuthRouter;