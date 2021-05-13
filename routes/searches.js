const express = require('express');
const searchesRouter = express.Router();
const db =  require('../models');
const Search = db.Search;

searchesRouter.post("/", async (req, res) => {
  try {
    await Search.create(req.body)
    res.sendStatus(201)
    console.log('search saved!')
  } catch(err) {
    console.log(err)
    res.sendStatus(400)
  }
})


module.exports = searchesRouter;