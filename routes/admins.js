const express = require('express');
const adminsRouter = express.Router();
const db =  require('../models');
const Admin = db.admin;
// const Property = db.property;
// const AgentProfilePicture = db.AgentProfilePicture
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const verifyToken = require('../middleware/agentAuth')
// const sgMail = require('@sendgrid/mail')


adminsRouter.post("/", async (req, res) => {
  console.log(req.body)
  const { name, email, password } = req.body

  // Check password length
  if(password.length < 6){
    return res.status(400).json({
      msg: 'Contraseña debe de tener un mínimo de 6 caracteres.'
    })
  }

  try {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create Admin
    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword
    })
    // Create and assign token
    const token = jwt.sign({id: admin.id}, process.env.TOKEN_SECRET, { expiresIn: '1d' })
    res.status(201).json({ token, admin: {id: admin.id, name: admin.name, email: admin.email} })
  } catch(err) {
    console.log(err.errors[0].message)
    res.status(400).json({msg: err.errors[0].message})
  }
})


module.exports = adminsRouter;