const express = require('express');
const listingsRouter = express.Router();
const db =  require('../models');
const Agent = db.agent;
const AgentProfilePicture = db.AgentProfilePicture;
const Property = db.property;
const PropertyAmenities = db.PropertyAmenities;
const PropertyPictures = db.PropertyPictures;
const sgMail = require('@sendgrid/mail');


listingsRouter.get("/", (req, res) => {
  Property.findAndCountAll({
    include: [{model: PropertyPictures, attributes: ['location']}],
    distinct: true,
    order: [['createdAt', 'DESC']]
  }).then(properties => {
    res.status(200).json({properties: properties.rows, count: properties.count});
  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
})

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

listingsRouter.put('/:id', async (req, res) => {
  req.body.listing_active = true
  req.body.status_change_timestamp = new Date()
  delete req.body['PropertyAmenity']
  delete req.body['PropertyPictures']
  delete req.body.agent
  delete req.body.createdAt
  delete req.body.updatedAt
  // console.log(req.body)

  // Email settings
  let sgKey;
  if(process.env.NODE_ENV === 'production') {
    sgKey = process.env.SENDGRID_PROD_EMAIL_API_KEY
  } else {
    sgKey = process.env.SENDGRID_DEV_EMAIL_API_KEY
  }
  sgMail.setApiKey(sgKey)

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
    // Email
    const msg = {
      from: {email: 'noreply@hauzzy.com', name: 'Hauzzy'},
      reply_to: 'noreply@hauzzy.com',
      template_id: 'd-21b276ffcabb46ae95eeeb00a77076cd',
      personalizations: [
        {
          to: [{email: updatedListing.agent.email}],
          dynamic_template_data: {
            name: updatedListing.agent.name,
            address: updatedListing.listing_address,
            link: `https://agent.hauzzy.com/account/listings`
          }
        }
      ]
    }
    await sgMail.send(msg)
    // console.log(updatedListing.toJSON(), 'verified...')
    res.status(200).json({msg: 'Propiedad Verificada.', updatedListing: updatedListing})
  } catch (err) {
    console.log(err.errors[0].message)
    res.status(400).json({msg: 'Algo salió mal. Intentalo de nuevo.'})
  }
})



module.exports = listingsRouter;