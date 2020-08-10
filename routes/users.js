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


module.exports = usersRouter;