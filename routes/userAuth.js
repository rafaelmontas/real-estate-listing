const express = require('express');
const userAuthRouter = express.Router();
const db =  require('../models');
const User = db.user;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const verifyToken = require('../middleware/userAuth')


// @route POST /user-auth
// @desc Auth user
// @acces Public
userAuthRouter.post("/", async (req, res) => {
  const { email, password } = req.body
  console.log(req.body.email)
  // Check if email doesn't exist
  const user = await User.findOne({ where: { email } })
  if(!user) return res.status(400).json({msg: 'Email incorrecto'})

  // Check if password is correct
  const validPass = await bcrypt.compare(password, user.password)
  if(!validPass) return res.status(400).json({msg: 'Contraseña incorrecta'})

  // Create and assign token
  const token = jwt.sign({id: user.id}, process.env.TOKEN_SECRET)
  // res.header('auth-token', token).send(token)

  res.json({ token, user: {id: user.id, name: user.name, email: user.email} })
  // res.send('Logged in!')
})

// @route GET /user-auth/user
// @desc Get user data
// @acces Private
userAuthRouter.get("/user", verifyToken, (req, res) => {
  User.findByPk(req.user.id)
        .then(user => {
          console.log(req.user)
          res.status(200).json({id: user.id, name: user.name, email: user.email})
        })
        .catch(err => {
          console.log(err)
          res.sendStatus(500);
        });
})



module.exports = userAuthRouter;