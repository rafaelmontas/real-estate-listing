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
  // console.log(req.body)
  // Check if email doesn't exist
  const agent = await Agent.findOne({ where: { email } })
  if(!agent) return res.status(400).json({msg: 'Email incorrecto'})

  // Check if password is correct
  const validPass = await bcrypt.compare(password, agent.password)
  if(!validPass) return res.status(400).json({msg: 'Contraseña incorrecta'})

   // Create and assign token
   const token = jwt.sign({id: agent.id}, process.env.TOKEN_SECRET,  { expiresIn: '2d' })
   
   res.status(201).json({ token, agent: {id: agent.id, name: agent.name, email: agent.email} })
})


// @route GET /agent-auth/agent
// @desc Get agent data
// @acces Private
agentAuthRouter.get("/agent", verifyToken, (req, res) => {
  Agent.findByPk(req.agent.id)
        .then(agent => {
          // console.log(req.agent)
          res.status(200).json({id: agent.id, name: agent.name, email: agent.email})
        })
        .catch(err => {
          console.log(err)
          res.sendStatus(500);
        });
})
// @route GET /agent-auth/forgot-password
// @desc Reset agent password
// @acces Public
agentAuthRouter.put("/forgot-password", async (req, res) => {
  const {email} = req.body
  // Simple validation - check if email field is empty
  if(!email) return res.status(400).json({msg: 'Ingresar email'})

  // Check if Email exists
  const agent = await Agent.findOne({ where: { email } })
  if(!agent) return res.status(400).send({msg: 'No existe agente con este email'})

  // Create and assign token
  const token = jwt.sign({id: agent.id}, process.env.TOKEN_SECRET, { expiresIn: '2h' })

  try {
    // Create and assign token
    // const token = jwt.sign({id: agent.id}, process.env.TOKEN_SECRET, { expiresIn: '2h' })
    await agent.update({reset_token: token})
    res.status(200).json({msg: 'Se ha enviado un link al correo electronico.'})
  } catch (err) {
    console.log(err.errors[0].message)
    res.status(400).json({msg: err.errors[0].message})
  }
})

agentAuthRouter.put("/reset-password/:token", async (req, res) => {
  const resetToken = req.params.token
  const newPassword = req.body.password

  // Check there is a token or it's not expired
  jwt.verify(resetToken, process.env.TOKEN_SECRET, (err) => {
    if (err) {
      res.status(401).json({msg: 'Token Invalido o Expirado.'});
    }
  })

  // Simple validation - check if password field is empty
  if(!newPassword) return res.status(400).json({msg: 'Ingresar nueva contraseña'})

  // Check if Agent exists
  const agent = await Agent.findOne({where: {reset_token: resetToken}})
  if(!agent) return res.status(400).send({msg: 'No existe agente con este token'})

  // Check password length
  if(newPassword.length < 6) return res.status(400).json({msg: 'Contraseña debe de tener un mínimo de 6 caracteres'})

  // Hash new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  try {
    await agent.update({password: hashedPassword, reset_token: ''})
    res.status(200).json({msg: 'Contraseña acualizada'})
  } catch (err) {
    console.log(err.errors[0].message)
    res.status(400).json({msg: err.errors[0].message})
  }

  // res.status(200).send(resetToken)
})

module.exports = agentAuthRouter;