const express = require('express');
const db =  require('../models');
const Like = db.like;
const userLikesRouter = express.Router({mergeParams: true});


userLikesRouter.get("/", async (req, res) => {
  console.log(req.params)
  try {
    const likes = await Like.findAll({where: {user_id: req.params.id}})
    res.status(200).json({likes})
  } catch(err) {
    console.log(err)
    res.sendStatus(500);
  }
})

userLikesRouter.post("/", async (req, res) => {
  console.log('likes post', req.body)
  try {
    await Like.create(req.body)
    res.status(200).json({msg: 'Like creado'})
  } catch(err) {
    console.log(err.errors[0].message)
    res.status(400).json({msg: err.errors[0].message})
  }
})

userLikesRouter.delete("/:like_id", async (req, res) => {
  try {
    // Get Like to be deleted
    console.log(req.params)
    const like = await Like.findByPk(req.params.like_id)
    await like.destroy()
    res.status(204).json({msg: 'like deleted'})
  } catch(err) {
    console.log(err)
    res.sendStatus(500);
  }
})

module.exports = userLikesRouter;