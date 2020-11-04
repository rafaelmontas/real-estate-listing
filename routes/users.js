const express = require('express');
const usersRouter = express.Router();
const db =  require('../models');
const User = db.user;
const Property = db.property;
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Op = Sequelize.Op
const verifyToken = require('../middleware/userAuth')



usersRouter.get("/:id", verifyToken, (req, res) => {
  // Verify that user requested is the same as the one requesting
  console.log(`User requesting: ${req.user.id} for user: ${Number(req.params.id)}`)
  if(req.user.id !== Number(req.params.id)) return res.status(401).json({msg: 'Access Denied'});

  User.findByPk(req.params.id, {include: Property})
        .then(user => {
          console.log(req.user, user.toJSON())
          res.status(200).json(user)
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
  console.log(req.body)
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
    const token = jwt.sign({id: user.id}, process.env.TOKEN_SECRET, { expiresIn: '2d' })
    console.log(user.toJSON())
    res.status(201).json({ token, user: {id: user.id, name: user.name, email: user.email} })
  } catch(err) {
    console.log(err.errors[0].message)
    res.status(400).json({msg: err.errors[0].message})
  }
})

// @route PUT users/:id
// @desc Update existing users
// @acces Private
usersRouter.put("/:id", verifyToken, async (req, res) => {
  const { name, email, phone_number, password, new_password } = req.body
  console.log(req.params, req.body)

  // Verify that user trying to update is the same as the one updating
  console.log(`User requesting update: ${req.user.id} for user: ${Number(req.params.id)}`)
  if(req.user.id !== Number(req.params.id)) return res.status(401).json({msg: 'Access Denied'});
  
  // Simple validation - check if fields are empty
  if(!email || !password) return res.status(400).json({msg: 'Ingresar Email y Contraseña'})

  // Check if Email already exists
  const user = await User.findByPk(req.user.id)
  if(!user) return res.status(400).send({msg: 'Usuario no existe'})

  // Check if password is correct
  const validPass = await bcrypt.compare(password, user.password)
  if(!validPass) return res.status(400).json({msg: 'Contraseña incorrecta'})


  // if update without new password
  try {
    if(password && !new_password) {
      // Remove password and new password from object
      let infoToUpdate = Object.assign({}, req.body);
      delete infoToUpdate.password
      delete infoToUpdate.new_password

      Object.keys(infoToUpdate).forEach(key => infoToUpdate[key] == false && delete infoToUpdate[key])
      console.log(infoToUpdate)

      await User.update(infoToUpdate, {where: { id: user.id }})

      res.status(200).json({msg: 'Perfil actualizado'})
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
      console.log(infoToUpdate)
      
      await User.update(info, {where: { id: user.id }})
      
      res.status(200).json({msg: 'Perfil actualizado con nueva contraseña'})
    }
  } catch(err) {
    console.log(err.errors[0].message)
    res.status(400).json({msg: err.errors[0].message})
  }
})

// @route DELETE users/:id
// @desc Delete existing users
// @acces Private
usersRouter.delete("/:id", verifyToken, async (req, res) => {
  // const password = req.body.password
  // console.log(req.body, req.data)
  
  // Verify that the user to be deleted is the same as the one deleting
  console.log(`User requesting delete: ${req.user.id} for user: ${Number(req.params.id)}`)
  if(req.user.id !== Number(req.params.id)) return res.status(401).json({msg: 'Access Denied'});

  // Simple validation - check if password is empty
  // if(!password) return res.status(401).json({msg: 'Confirmar Contraseña'})

  // Get user to be deleted
  const user = await User.findByPk(req.user.id)
  if(!user) return res.status(404).send({msg: 'Usuario no existe'})

  // Check if password is correct
  // const validPass = await bcrypt.compare(password, user.password)
  // if(!validPass) return res.status(401).json({msg: 'Contraseña incorrecta'})

  try {
    await user.destroy()
    res.sendStatus(204)
  } catch(err) {
    console.log(err.errors[0].message)
    res.status(500).json({msg: err.errors[0].message})
  }  
})

module.exports = usersRouter;