const express = require('express');
const searchesRouter = express.Router();
const db =  require('../models');
const Search = db.Search;

searchesRouter.post("/", async (req, res) => {
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
    await Search.create(body)
    res.sendStatus(201)
    console.log('search saved!')
  } catch(err) {
    console.log(err)
    res.sendStatus(400)
  }
})


module.exports = searchesRouter;