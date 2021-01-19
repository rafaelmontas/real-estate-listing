const express = require('express');
const agentsRouter = express.Router();
const db =  require('../models');
const Agent = db.agent;
const Property = db.property;
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const Op = Sequelize.Op

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

// @route POST agents/
// @desc Register new agents
// @acces Public
agentsRouter.post("/", async (req, res) => {
  console.log(req.body)
  const { name, email, password } = req.body

  // Simple validation - check if fields are empty
  if(!name || !email || !password) return res.status(400).json({msg: 'Ingresar nombre, email y contraseña'})
  
  // Check if Email already exists
  const emailExists = await Agent.findOne({ where: { email } })
  if(emailExists) return res.status(400).send({msg: 'Email ya existe'})

  // Check password length
  if(password.length < 6) return res.status(400).json({msg: 'Contraseña debe de tener un mínimo de 6 caracteres'})

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create Agent
  try {
    const agent = await Agent.create({
      name,
      email,
      password: hashedPassword
    })
    console.log(agent.toJSON())
    // Create and assign token
    const token = jwt.sign({id: agent.id}, process.env.TOKEN_SECRET, { expiresIn: '2d' })
    res.status(201).json({ token, agent: {id: agent.id, name: agent.name, email: agent.email} })
  } catch(err) {
    console.log(err.errors[0].message)
    res.status(400).json({msg: err.errors[0].message})
  }
})

module.exports = agentsRouter;