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
    // console.log(listing.toJSON())
    res.status(200).json({listing})
  } catch(err) {
    res.status(500).json('There was an error.')
  }
})

listingsRouter.put('/:id', async (req, res) => {
  req.body.listing_active = true
  req.body.status_change_timestamp = new Date()
  delete req.body['PropertyAmenity']
  delete req.body['PropertyPictures']
  delete req.body.agent
  delete req.body.createdAt
  delete req.body.updatedAt
  // console.log(req.body)
  try {
    await Property.update(req.body, {
      where: {id: req.params.id},
      silent: true
    })
    const updatedListing = await Property.findOne({
      where: {id: req.params.id},
      include: [
        {model: PropertyAmenities},
        {model: PropertyPictures, attributes: ['id', 'location']},
        {model: Agent, include: [{model: AgentProfilePicture, attributes: ['location']}]}
      ]
    })
    // console.log(updatedListing.toJSON(), 'verified...')
    res.status(200).json({msg: 'Propiedad Verificada.', updatedListing: updatedListing})
  } catch (err) {
    console.log(err.errors[0].message)
    res.status(400).json({msg: 'Algo salió mal. Intentalo de nuevo.'})
  }
})



module.exports = listingsRouter;