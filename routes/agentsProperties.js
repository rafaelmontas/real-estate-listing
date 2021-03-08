const express = require('express');
const db =  require('../models');
const Property = db.property;
const agentsPropertiesRouter = express.Router({mergeParams: true});


agentsPropertiesRouter.get('/', async (req, res) => {
  try {
    const listings = await Property.findAndCountAll({where: {agent_id: req.params.id}})
    console.log('all properties')
    res.status(200).json({listings: listings.rows, count: listings.count, msg: 'agent properties'})
  } catch(err) {
    res.status(400).json('There was an error.')
  }
})

agentsPropertiesRouter.get('/:propertyId', async (req, res) => {
  try {
    const listing = await Property.findOne({where: {id: req.params.propertyId, agent_id: req.params.id}})
    console.log(listing.toJSON())
    res.status(200).json({listing: listing, msg: 'agent property'})
  } catch(err) {
    res.status(400).json('There was an error.')
  }
})

agentsPropertiesRouter.post('/', async (req, res) => {
  console.log(req.body)
  const { listing_address, property_type, listing_type, bedrooms, bathrooms, half_bathrooms, parking_spaces, square_meters, listing_price, agent_id } = req.body
  // Check if fields are empty
  if(!listing_address || !property_type || !listing_type || !bedrooms || !bathrooms || !half_bathrooms || !parking_spaces || !square_meters || !listing_price || !agent_id) {
    return res.status(400).json({msg: 'Favor seleccionar todos los campos obligatorios.'})
  }

  // Create Listing
  try {
    const listing = await Property.create(req.body)
    console.log(listing.toJSON())
    res.status(200).json({msg: 'Propiedad Publicada', listing_id: listing.id})
  } catch(err) {
    console.log(err.errors[0].message)
    res.status(400).json({msg: err.errors[0].message})
  }
})


module.exports = agentsPropertiesRouter;