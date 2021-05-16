const express = require('express');
const db =  require('../models');
const ListingView = db.ListingView;
const listingViewRouter = express.Router({mergeParams: true})

listingViewRouter.post("/", async (req, res) => {
  console.log(req.body)
  try {
    await ListingView.create(req.body)
    console.log('view created')
    res.sendStatus(201)
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
})


module.exports = listingViewRouter;