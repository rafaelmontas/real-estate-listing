const express = require('express');
const usersRouter = express.Router();
const db =  require('../models');
const User = db.user;
const Property = db.property;
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Op = Sequelize.Op
const verifyToken = require('../middleware/userAuth')


// const verifyToken = (req, res, next) => {
//   const token = req.header('user-auth');
//   if(!token) return res.status(401).json({msg: 'Access Denied'});

//   try {
//     const verified = jwt.verify(token, process.env.TOKEN_SECRET);
//     req.user = verified;
//     next();
//   } catch(err) {
//     res.status(400).send('Invalid Token');
//   }
// }

// usersRouter.get("/getUser", verifyToken, (req, res) => {
//   User.findByPk(req.user.id)
//         .then(user => {
//           console.log(req.user)
//           res.status(200).send({id: user.id, name: user.name, email: user.email})
//         })
//         .catch(err => {
//           console.log(err)
//           res.sendStatus(500);
//         });
// })


usersRouter.get("/:id", verifyToken, (req, res) => {
  User.findByPk(req.params.id, {include: Property})
        .then(user => {
          console.log(req.user)
          res.status(200).send(user)
        })
        .catch(err => {
          console.log(err)
          res.sendStatus(500);
        });
})


// @route POST users/
// @desc Register new users
// @acces Public
usersRouter.post("/", async (req, res) => {
  const { name, email, password } = req.body

  // Simple validation - check if fields are empty
  if(!email || !password) return res.status(400).json({msg: 'Ingresar Email y Contraseña'})

  // Check if Email already exists
  const emailExists = await User.findOne({ where: { email } })
  if(emailExists) return res.status(400).send({msg: 'Email ya existe'})

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create User
  try {
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    })
    // Create and assign token
    const token = jwt.sign({id: user.id}, process.env.TOKEN_SECRET, { expiresIn: 3600 })
    console.log(user.toJSON())
    res.status(201).json({ token, user: {id: user.id, name: user.name, email: user.email} })
  } catch(err) {
    console.log(err)
    res.sendStatus(400)
  }
})

// Login
// usersRouter.post("/login", async (req, res) => {
//   const { email, password } = req.body
//   console.log(req.body.email)
//   const user = await User.findOne({ where: { email } })
//   // Check if email doesn't exist
//   if(!user) return res.status(400).json({msg: 'Email incorrecto'})

//   // Check if password is correct
//   const validPass = await bcrypt.compare(password, user.password)
//   if(!validPass) return res.status(400).json({msg: 'Contraseña incorrecta'})

//   // Create and assign token
//   const token = jwt.sign({id: user.id}, process.env.TOKEN_SECRET)
//   // res.header('auth-token', token).send(token)

//   res.json({ token, user: {id: user.id, name: user.name, email: user.email} })
//   // res.send('Logged in!')
// })

module.exports = usersRouter;