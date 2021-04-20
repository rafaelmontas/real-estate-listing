const express = require('express');
const adminAuthRouter = express.Router();
const db =  require('../models');
const Admin = db.admin;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verifyToken = require('../middleware/adminAuth')
const sgMail = require('@sendgrid/mail')


// @route POST /admin-auth
// @desc Auth admin
// @acces Public
adminAuthRouter.post("/", async (req, res) => {
  const { email, password } = req.body
  // console.log(req.body)
  // Check if email doesn't exist
  const admin = await Admin.findOne({ where: { email } })
  if(!admin) return res.status(400).json({msg: 'Email incorrecto'})

  // Check if password is correct
  const validPass = await bcrypt.compare(password, admin.password)
  if(!validPass) return res.status(400).json({msg: 'Contraseña incorrecta'})

   // Create and assign token
   const token = jwt.sign({id: admin.id}, process.env.TOKEN_SECRET,  { expiresIn: '1d' })
   
   res.status(201).json({ token, admin: {id: admin.id, name: admin.name, email: admin.email} })
})


// @route GET /admin-auth/admin
// @desc Get admin data
// @acces Private
adminAuthRouter.get("/admin", verifyToken, (req, res) => {
  Admin.findByPk(req.admin.id)
        .then(admin => {
          console.log(req.admin)
          res.status(200).json({id: admin.id, name: admin.name, email: admin.email})
        })
        .catch(err => {
          console.log(err)
          res.sendStatus(500);
        });
})

module.exports = adminAuthRouter;