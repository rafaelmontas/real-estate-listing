const express = require('express');
const usersRouter = express.Router();
const db =  require('../models');
const User = db.user;
const Property = db.property;
const Sequelize = require('sequelize');
const Op = Sequelize.Op

usersRouter.get("/:id", (req, res) => {
  User.findByPk(req.params.id, {include: Property})
        .then(user => {
          res.status(200).send(user)
        })
        .catch(err => {
          console.log(err)
          res.sendStatus(500);
        });
})

usersRouter.post("/", (req, res) => {
  // const emailExists = User.findOne({ where: { email: req.body.email } })
  // if(emailExists) return res.status(400).send("Email ya existe")

  const user = User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }).then(user => {
    console.log(user.toJSON())
    res.status(201).send(user)
  }).catch(err => {
    console.log(err)
    res.sendStatus(400);
  })
})


module.exports = usersRouter;