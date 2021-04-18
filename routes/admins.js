const express = require('express');
const adminsRouter = express.Router();
const db =  require('../models');
// const Agent = db.agent;
// const Property = db.property;
// const AgentProfilePicture = db.AgentProfilePicture
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const verifyToken = require('../middleware/agentAuth')
// const sgMail = require('@sendgrid/mail')


adminsRouter.post("/", async (req, res) => {
  console.log(body)
  const { name, email, password } = req.body
})


module.exports = adminsRouter;