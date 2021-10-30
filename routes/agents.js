const express = require('express');
const agentsRouter = express.Router();
const db =  require('../models');
const Agent = db.agent;
const Property = db.property;
const AgentProfilePicture = db.AgentProfilePicture
const ListingView = db.ListingView
const AgentLead = db.AgentLead;
const PropertyPictures = db.PropertyPictures;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/agentAuth')
const sgMail = require('@sendgrid/mail')
// const Sequelize = require('sequelize');
// const Op = Sequelize.Op

// Use nested route
const agentsProfilePicturesRouter =  require('./agentsProfilePictures')
agentsRouter.use('/:id/profile-pictures', agentsProfilePicturesRouter)

const agentsPropertiesRouter = require('./agentsProperties')
agentsRouter.use('/:id/properties', agentsPropertiesRouter)

const agentLeadsRouter = require('./agentLeads')
agentsRouter.use('/:id/leads', agentLeadsRouter)


agentsRouter.get("/:id", verifyToken, (req, res) => {
  // Verify that agent requested is the same as the one requesting
  console.log(`Agent requesting: ${req.agent.id} for agent: ${req.params.id}`)
  if(req.agent.id !== req.params.id) return res.status(401).json({msg: 'Access Denied'});
  
  Agent.findByPk(req.params.id, {
    attributes: {
      include: [
        // [db.sequelize.fn('COUNT', db.sequelize.fn('DISTINCT', db.sequelize.col('properties.id'))), 'n_listings'],
        [db.sequelize.fn('COUNT', db.sequelize.fn('DISTINCT', db.sequelize.col('ListingViews.id'))), 'n_views'],
        [db.sequelize.fn('COUNT', db.sequelize.fn('DISTINCT', db.sequelize.col('AgentLeads.id'))), 'n_leads']
      ]
    },
    // subQuery: false,
    include: [
      {
        model: Property,
        attributes: {
          include: [
            [db.sequelize.fn('COUNT', db.sequelize.fn('DISTINCT', db.sequelize.col('properties->ListingViews.id'))), 'n_views']
          ]
        },
        where: {listing_active: true},
        required: false,
        include: [
          {model: ListingView, attributes: []},
          {model: PropertyPictures, attributes: ['location']}
        ]
      },
      {model: AgentProfilePicture, attributes: ['location']},
      {model: ListingView, attributes: []},
      {model: AgentLead, attributes: []}
    ],
    group: ['agent.id', 'properties.id', 'AgentProfilePicture.id', 'properties->PropertyPictures.id'],
    order: [[db.sequelize.fn('COUNT', db.sequelize.fn('DISTINCT', db.sequelize.col('properties->ListingViews.id'))), 'DESC']],
    // limit: 3
  })
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
  // console.log(req.body)
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

  // Email settings
  let sgKey;
  if(process.env.NODE_ENV === 'production') {
    sgKey = process.env.SENDGRID_PROD_EMAIL_API_KEY
  } else {
    sgKey = process.env.SENDGRID_DEV_EMAIL_API_KEY
  }
  sgMail.setApiKey(sgKey)

  // Create Agent
  try {
    const agent = await Agent.create({
      name,
      email,
      password: hashedPassword
    })
    // console.log(agent.toJSON())
    const msg = {
      from: {email: 'noreply@hauzzy.com', name: 'Hauzzy'},
      reply_to: 'noreply@hauzzy.com',
      template_id: 'd-21dc6ef0d6a7496985cb9fd67e50825b',
      personalizations: [
        {
          to: [{email: agent.email}],
          dynamic_template_data: {
            name: agent.name,
            link: `https://agent.hauzzy.com/login`
          }
        }
      ]
    }
    await sgMail.send(msg)
    // Create and assign token
    const token = jwt.sign({id: agent.id}, process.env.TOKEN_SECRET, { expiresIn: '2d' })
    res.status(201).json({ token, agent: {id: agent.id, name: agent.name, email: agent.email} })
  } catch(err) {
    console.log(err.errors[0].message)
    res.status(400).json({msg: err.errors[0].message})
  }
})

// @route PUT agents/:id
// @desc Update existing agents
// @acces Private
agentsRouter.put("/:id", verifyToken, async (req, res) => {
  const { name, email, phone_number, alt_phone_number, agent_license, brokerage_name, password, new_password } = req.body
  // console.log(req.params, req.body)

  // Verify that agent trying to update is the same as the one updating
  console.log(`Agent requesting update: ${req.agent.id} for agent: ${req.params.id}`)
  if(req.agent.id !== req.params.id) return res.status(401).json({msg: 'Access Denied'});
  
  // Simple validation - check if fields are empty
  if(!name || !email || !password) return res.status(400).json({msg: 'Ingresar nombre, email y contraseña'})

  // Check if agent exists
  const agent = await Agent.findByPk(req.agent.id)
  if(!agent) return res.status(400).send({msg: 'Usuario no existe'})

  // Check if password is correct
  const validPass = await bcrypt.compare(password, agent.password)
  if(!validPass) return res.status(400).json({msg: 'Contraseña incorrecta'})

  try {
    // if update without new password
    if(password && !new_password) {
      // Remove password and new password from object
      let infoToUpdate = Object.assign({}, req.body);
      delete infoToUpdate.password
      delete infoToUpdate.new_password

      Object.keys(infoToUpdate).forEach(key => infoToUpdate[key] == false && delete infoToUpdate[key])
      // console.log(infoToUpdate)

      const updatedAgent = await Agent.update(infoToUpdate, {where: { id: agent.id }, returning: true})
      const returningAgentData = {
        id: updatedAgent[1][0].id,
        name: updatedAgent[1][0].name,
        email: updatedAgent[1][0].email,
        phone_number: updatedAgent[1][0].phone_number,
        alt_phone_number: updatedAgent[1][0].alt_phone_number,
        agent_license: updatedAgent[1][0].agent_license,
        brokerage_name: updatedAgent[1][0].brokerage_name,
        createdAt: updatedAgent[1][0].createdAt
      }
      // console.log(returningAgentData)
      res.status(200).json({msg: 'Perfil actualizado', updatedAgent: returningAgentData})
    } else if(password && new_password) {
      // Hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(new_password, salt);

      let info = req.body
      info.password = hashedPassword

      // Remove new password from object
      let infoToUpdate = Object.assign({}, info);
      delete infoToUpdate.new_password

      Object.keys(infoToUpdate).forEach(key => infoToUpdate[key] == false && delete infoToUpdate[key])
      // console.log(infoToUpdate)
      
      const updatedAgent = await Agent.update(info, {where: { id: agent.id }, returning: true})
      const returningAgentData = {
        id: updatedAgent[1][0].id,
        name: updatedAgent[1][0].name,
        email: updatedAgent[1][0].email,
        phone_number: updatedAgent[1][0].phone_number,
        alt_phone_number: updatedAgent[1][0].alt_phone_number,
        agent_license: updatedAgent[1][0].agent_license,
        brokerage_name: updatedAgent[1][0].brokerage_name,
        createdAt: updatedAgent[1][0].createdAt
      }
      
      res.status(200).json({msg: 'Perfil actualizado con nueva contraseña', updatedAgent: returningAgentData})
    }
  } catch (err) {
    console.log(err.errors[0].message)
    res.status(400).json({msg: err.errors[0].message})
  }
})

// @route DELETE agents/:id
// @desc Delete existing agents
// @acces Private
agentsRouter.delete("/:id", verifyToken, async (req, res) => {
  // Verify that the agent to be deleted is the same as the one deleting
  console.log(`Agent requesting delete: ${req.agent.id} for agent: ${req.params.id}`)
  if(req.agent.id !== req.params.id) return res.status(401).json({msg: 'Access Denied'});

  // Get agent to be deleted
  const agent = await Agent.findByPk(req.agent.id)
  if(!agent) return res.status(404).send({msg: 'Usuario no existe'})

  try {
    await agent.destroy()
    res.sendStatus(204)
  } catch(err) {
    console.log(err.errors[0].message)
    res.status(500).json({msg: err.errors[0].message})
  }  
})


module.exports = agentsRouter;