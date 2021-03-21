const express = require('express');
const db =  require('../models');
const Property = db.property;
const PropertyAmenities = db.PropertyAmenities;
const PropertyPictures = db.PropertyPictures;
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
    const listing = await Property.findOne({
      where: {id: req.params.propertyId, agent_id: req.params.id},
      include: [{model: PropertyAmenities}, {model: PropertyPictures, attributes: ['id', 'location', 'original_name']}]
    })
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

agentsPropertiesRouter.put('/:propertyId', async (req, res) => {
  req.body.listing_active = false
  delete req.body['PropertyAmenity']
  delete req.body['PropertyPictures']
  delete req.body.createdAt
  delete req.body.updatedAt
  console.log(req.body, 'update...')
  try {
    const updateListing = await Property.update(req.body, {
      where: {id: req.params.propertyId, agent_id: req.params.id}
    })
    const updatedListing = await Property.findOne({
      where: {id: req.params.propertyId, agent_id: req.params.id},
      include: [{model: PropertyAmenities}, {model: PropertyPictures, attributes: ['id', 'location', 'original_name']}]
    })
    console.log(updatedListing.toJSON(), 'update...')
    res.status(200).json({msg: 'Propiedad Actualizada. En proceso de verificación.', updatedListing: updatedListing})
  } catch (err) {
    console.log(err.errors[0].message)
    res.status(400).json({msg: 'Algo salió mal. Intentalo de nuevo.'})
  }
})

agentsPropertiesRouter.delete('/:propertyId', async (req, res) => {
  // Get listing to be deleted
  const listing = await Property.findOne({where: {id: req.params.propertyId, agent_id: req.params.id}})
  if(!listing) return res.status(404).send({msg: 'Propiedad no existe'})

  try {
    await listing.destroy()
    res.sendStatus(204)
  } catch (err) {
    console.log(err.errors[0].message)
    res.status(500).json({msg: err.errors[0].message})
  }
})


module.exports = agentsPropertiesRouter;