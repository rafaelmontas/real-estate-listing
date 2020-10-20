const express = require('express');
const usersRouter = express.Router();
const db =  require('../models');
const User = db.user;
const Property = db.property;
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Op = Sequelize.Op


const verifyToken = (req, res, next) => {
  const token = req.header('user-auth');
  if(!token) return res.status(401).send('Access Denied');

  try{
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch(err) {
    res.status(400).send('Invalid Token');
  }
}

usersRouter.get("/getUser", verifyToken, (req, res) => {
  User.findByPk(req.user.id)
        .then(user => {
          console.log(req.user)
          res.status(200).send(user)
        })
        .catch(err => {
          console.log(err)
          res.sendStatus(500);
        });
})


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


// Register
usersRouter.post("/", async (req, res) => {
  const emailExists = await User.findOne({ where: { email: req.body.email } })
  // if email exists
  if(emailExists !== null) {
    return res.status(400).send("Email ya existe")
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  }).then(user => {
    console.log(user.toJSON())
    res.status(201).send(user)
  }).catch(err => {
    console.log(err)
    res.sendStatus(400);
  })
})

// Login
usersRouter.post("/login", async (req, res) => {
  console.log(req.body.email)
  const user = await User.findOne({ where: { email: req.body.email } })
  // Check if email doesn't exist
  if(user === null) {
    return res.status(400).json("Email incorrecto")
  }
  // Check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password)
  if(!validPass) return res.status(400).send('Contraseña incorrecta')

  // Create and assign token
  const token = jwt.sign({id: user.id}, process.env.TOKEN_SECRET)
  // res.header('auth-token', token).send(token)

  res.json(token)
  // res.send('Logged in!')
})

module.exports = usersRouter;