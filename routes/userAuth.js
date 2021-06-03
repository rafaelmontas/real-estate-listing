const express = require('express');
const userAuthRouter = express.Router();
const db =  require('../models');
const User = db.user;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verifyToken = require('../middleware/userAuth')
const sgMail = require('@sendgrid/mail')


// @route POST /user-auth
// @desc Auth user
// @acces Public
userAuthRouter.post("/", async (req, res) => {
  const { email, password } = req.body
  // console.log(req.body.email)
  // Check if email doesn't exist
  const user = await User.findOne({ where: { email } })
  if(!user) return res.status(400).json({msg: 'Email incorrecto'})

  // Check if password is correct
  const validPass = await bcrypt.compare(password, user.password)
  if(!validPass) return res.status(400).json({msg: 'Contraseña incorrecta'})

  // Create and assign token
  const token = jwt.sign({id: user.id}, process.env.TOKEN_SECRET,  { expiresIn: '2d' })
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
          // console.log(req.user)
          res.status(200).json({id: user.id, name: user.name, email: user.email})
        })
        .catch(err => {
          console.log(err)
          res.sendStatus(500);
        });
})

// @route GET /user-auth/forgot-password
// @desc Reset user password
// @acces Public
userAuthRouter.put("/forgot-password", async (req, res) => {
  const {email} = req.body
  // Simple validation - check if email field is empty
  if(!email) return res.status(400).json({msg: 'Ingresar email'})

  // Check if Email exists
  const user = await User.findOne({ where: { email } })
  if(!user) return res.status(400).send({msg: 'No existe usuario con este email'})

  // Create and assign token
  const token = jwt.sign({id: user.id}, process.env.TOKEN_SECRET, { expiresIn: '2h' })

  // Email settings
  let sgKey;
  if(process.env.NODE_ENV === 'production') {
    sgKey = process.env.SENDGRID_PROD_EMAIL_API_KEY
  } else {
    sgKey = process.env.SENDGRID_DEV_EMAIL_API_KEY
  }
  sgMail.setApiKey(sgKey)
  const msg = {
    from: {email: 'noreply@hauzzy.com', name: 'Hauzzy'},
    reply_to: 'noreply@hauzzy.com',
    template_id: 'd-dd67e2cd23984cb9955ab7373d47b076',
    personalizations: [
      {
        to: [{email: user.email}],
        dynamic_template_data: {
          name: user.name,
          link_reset: `https://www.hauzzy.com/reset-password/${token}`
        }
      }
    ]
  }

  try {
    // Create and assign token
    // const token = jwt.sign({id: agent.id}, process.env.TOKEN_SECRET, { expiresIn: '2h' })
    await user.update({reset_token: token})
    await sgMail.send(msg)
    res.status(200).json({msg: 'Se ha enviado un link al correo electronico.'})
  } catch (err) {
    console.log(err.errors[0].message)
    res.status(400).json({msg: err.errors[0].message})
  }
})

userAuthRouter.put("/reset-password/:token", async (req, res) => {
  const resetToken = req.params.token
  const newPassword = req.body.password

  // Check there is a token or it's not expired
  jwt.verify(resetToken, process.env.TOKEN_SECRET, (err) => {
    if (err) {
      console.log(err)
      res.status(401).json({msg: 'Token Invalido o Expirado.'});
    }
  })

  // Simple validation - check if password field is empty
  if(!newPassword) return res.status(400).json({msg: 'Ingresar nueva contraseña'})

  // Check if User exists
  const user = await User.findOne({where: {reset_token: resetToken}})
  if(!user) return res.status(400).send({msg: 'No existe usuario con este token'})

  // Check password length
  if(newPassword.length < 6) return res.status(400).json({msg: 'Contraseña debe de tener un mínimo de 6 caracteres'})

  // Hash new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  try {
    await user.update({password: hashedPassword, reset_token: ''})
    res.status(200).json({msg: 'Contraseña acualizada'})
  } catch (err) {
    console.log(err.errors[0].message)
    res.status(400).json({msg: err.errors[0].message})
  }
})


module.exports = userAuthRouter;