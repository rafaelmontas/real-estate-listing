const express = require('express')
const db =  require('../models')
const PropertyAmenities = db.PropertyAmenities
const propertyAmenitiesRouter = express.Router({mergeParams: true})

propertyAmenitiesRouter.post('/', async (req, res) => {
  const body = {
    half_bathrooms: req.body.halfBath,
    air_conditioner: req.body.aC,
    game_zone: req.body.gameZone,
    laundry_room: req.body.laundryRoom,
    social_area: req.body.socialArea,
    elevator: req.body.elevator,
    balcony: req.body.balcony,
    family_room: req.body.familyRoom,
    shared_gas: req.body.centralGas,
    gym: req.body.gym,
    service_room: req.body.serviceRoom,
    jacuzzy: req.body.jacuzzy,
    lobby: req.body.lobby,
    swimming_pool: req.body.pool,
    marble_floor: req.body.floor,
    power_plant: req.body.powerPlant,
    security: req.body.security,
    walk_in_closet: req.body.wiCloset,
    furnished: req.body.furnished,
    security_system: req.body.securitySystem,
    hardwood_floor: req.body.hardwoodFloor,
    property_id: req.params.id
  }
  // Check if field is empty
  if(!body.property_id) return req.status(400).json('Ha ocurrido un error.')

  try {
    const amenities = await PropertyAmenities.create(body)
    console.log(amenities.toJSON())
    res.status(200).json({msg: 'Amenities Created', listing_id: req.params.id})
  } catch(err) {
    console.log(err.errors[0].message)
    res.status(400).json({msg: err.errors[0].message})
  }
})

propertyAmenitiesRouter.put('/:amenityId', async (req, res) => {
  try {
    const updatedAmenities = await PropertyAmenities.update(req.body, {
      where: {id: req.params.amenityId, property_id: req.params.id},
      returning: true
    })
    console.log(updatedAmenities[1][0])
    res.status(200).json({msg: 'Amenidades Actualizadas.'})
  } catch(err) {
    console.log(err.errors[0].message)
    res.status(400).json({msg: 'Algo salió mal. Intentalo de nuevo.'})
  }
})

module.exports = propertyAmenitiesRouter