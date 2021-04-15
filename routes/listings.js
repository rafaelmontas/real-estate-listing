const express = require('express');
const listingsRouter = express.Router();
const db =  require('../models');
const Agent = db.agent;
const AgentProfilePicture = db.AgentProfilePicture
const Property = db.property;
const PropertyAmenities = db.PropertyAmenities;
const PropertyPictures = db.PropertyPictures;

// @route GET /listings/:id
// @desc Get One Property
// @access Private
listingsRouter.get("/:id", async (req, res) => {
  try {
    const listing = await Property.findOne({
      where: {id: req.params.id},
      include: [
        {model: PropertyAmenities},
        {model: PropertyPictures, attributes: ['id', 'location']},
        {model: Agent, include: [{model: AgentProfilePicture, attributes: ['location']}]}
      ]
    })
    console.log(listing.toJSON())
    res.status(200).json({listing})
  } catch(err) {
    res.status(500).json('There was an error.')
  }
})



module.exports = listingsRouter;