const express = require('express');
const propertiesRouter = express.Router();
const db =  require('../models');
const Property = db.property;
const PropertyAmenities = db.PropertyAmenities;
const PropertyPictures = db.PropertyPictures;
const Sequelize = require('sequelize');
const Op = Sequelize.Op


// Use nested route
const propertyPicturesRouter = require('./propertyPictures')
propertiesRouter.use('/:id/pictures', propertyPicturesRouter)
// Use nested route
const propertyAmenitiesRouter = require('./propertyAmenities')
propertiesRouter.use('/:id/amenities', propertyAmenitiesRouter)
// Use nested route
const listingViewRouter = require('./listingViews')
propertiesRouter.use('/:id/views', listingViewRouter)

// @route GET /properties/
// @desc Get All Properties
// @access Public
function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}
propertiesRouter.get("/", (req, res) => {
  console.log(req.query)
  if(isEmpty(req.query) || req.query.utm_source) {
    Property.findAndCountAll({
      where: {listing_active: true, listing_type: 'sale'},
      include: [{model: PropertyPictures, attributes: ['location']}],
      distinct: true
    }).then(properties => {
      res.status(200).json({properties: properties.rows, count: properties.count});
    }).catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
  } else {
    let bedsQuery;
    let bathsQuery;
    if (req.query.bedrooms == 0 && req.query.bathrooms == 0) {
      bedsQuery = {
        [Op.gte]: req.query.bedrooms
      },
      bathsQuery = {
        [Op.gte]: req.query.bathrooms
      }
    } else if (req.query.bedrooms != 0 && req.query.bathrooms != 0) {
        bedsQuery = {
          [Op.eq]: req.query.bedrooms
        },
        bathsQuery = {
          [Op.eq]: req.query.bathrooms
        } 
    } else if (req.query.bedrooms != 0 && req.query.bathrooms == 0) {
        bedsQuery = {
          [Op.eq]: req.query.bedrooms
        },
        bathsQuery = {
          [Op.gte]: req.query.bathrooms
        }
    } else if (req.query.bedrooms == 0 && req.query.bathrooms != 0) {
        bedsQuery = {
          [Op.gte]: req.query.bedrooms
        },
        bathsQuery = {
          [Op.eq]: req.query.bathrooms
        }
    } else {
        bedsQuery = {
          [Op.eq]: req.query.bedrooms
        },
        bathsQuery = {
          [Op.eq]: req.query.bathrooms
        }
    }
    let propertyTypeString = req.query.property_type;
    let propertyTypeResult = propertyTypeString.split(",");
    // Province
    let province;
    if(req.query.province === "All") {
      province = {
        [Op.like]: "%"
      }
    } else {
      province = {
        [Op.eq]: req.query.province
      }
    }
    // let sector = req.query.sector;
    let sector;
    if(req.query.sector === "All") {
      sector = {
        [Op.like]: "%"
      }
    } else {
      sector = {
        [Op.eq]: req.query.sector
      }
    }
    Property.findAndCountAll({
      // where: req.query
      where: {
        listing_active: true,
        province: province,
        sector: sector,
        listing_type: req.query.listing_type,
        listing_price: {
          [Op.between]: [req.query.minPrice, req.query.maxPrice]
        },
        bedrooms: bedsQuery,
        bathrooms: bathsQuery,
        property_type: {
          [Op.or]: propertyTypeResult
        }
      },
      include: [{model: PropertyPictures, attributes: ['location']}],
      distinct: true
    }).then(properties => {
      res.status(200).json({properties: properties.rows, count: properties.count});
      console.log(req.params, req.query)
    }).catch(err => {
      console.log(req.query);
      console.log(err);
      res.sendStatus(500);
    })
  }
  
});
  

// @route GET /properties/:id
// @desc Get One Property
// @access Public
propertiesRouter.get("/:id", (req, res) => {
  Property.findOne({
    where: {id: req.params.id},
    include: [{model: PropertyAmenities}, {model: PropertyPictures, attributes: ['id', 'location']}]
  })
  .then(property => {
    res.status(200).send(property)
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
})


// @route POST /properties/
// @desc Register new properties
// @acces Public
propertiesRouter.post("/", async (req, res) => {
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



module.exports = propertiesRouter;