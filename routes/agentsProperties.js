const express = require('express');
const db =  require('../models');
const Property = db.property;
const agentsPropertiesRouter = express.Router({mergeParams: true});


agentsPropertiesRouter.get('/:property_id', async (req, res) => {
  try {
    const listing = await Property.findOne({
      where: {
        id: req.params.property_id,
        agent_id: req.params.id
      }
    })
    console.log(listing.toJSON())
    res.status(200).json({listing: listing, msg: 'agents properties'})
  } catch(err) {
    res.status(400).json('There was an error.')
  }
})




module.exports = agentsPropertiesRouter;