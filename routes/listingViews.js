const express = require('express');
const db =  require('../models');
const ListingView = db.ListingView;
const listingViewRouter = express.Router({mergeParams: true})

listingViewRouter.post("/", async (req, res) => {
  let body = req.body
  body.browser = req.useragent.browser
  if(req.body.os === 'Android' || req.body.os === 'iOS' || req.body.os === 'iPhone OS') {
    body.os = req.body.os
  } else {
    body.os = req.useragent.os  
  }
  // body.os = req.useragent.os
  body.platform = req.useragent.platform === 'unknown' ? req.body.platform : req.useragent.platform
  body.is_mobile = req.useragent.isMobile
  body.is_mobile_native = req.useragent.isMobileNative
  console.log(body)
  try {
    await ListingView.create(body)
    console.log('view created')
    res.sendStatus(201)
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
})


module.exports = listingViewRouter;