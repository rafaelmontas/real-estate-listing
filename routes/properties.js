const express = require('express');
const propertiesRouter = express.Router();
const db =  require('../models');
const Property = db.property;
const Sequelize = require('sequelize');
const Op = Sequelize.Op

// @route GET /properties/
// @desc Get All Properties
// @access Public
// propertiesRouter.get("/", (req, res) => {
//   Property.findAll().then(properties => {
//     res.status(200).send(properties);
//   }).catch(err => {
//     console.log(err);
//     res.sendStatus(500);
//   });
// })

function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}
propertiesRouter.get("/", (req, res) => {
  if(isEmpty(req.query)) {
    Property.findAll().then(properties => {
      res.status(200).send(properties);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
  } else {
    let bedsQuery;
    let bathsQuery;
    if (req.query.beds == 0 && req.query.baths == 0) {
      bedsQuery = {
        [Op.gte]: req.query.beds
      },
      bathsQuery = {
        [Op.gte]: req.query.baths
      }
    } else if (req.query.beds != 0 && req.query.baths != 0) {
        bedsQuery = {
          [Op.eq]: req.query.beds
        },
        bathsQuery = {
          [Op.eq]: req.query.baths
        } 
    } else if (req.query.beds != 0 && req.query.baths == 0) {
        bedsQuery = {
          [Op.eq]: req.query.beds
        },
        bathsQuery = {
          [Op.gte]: req.query.baths
        }
    } else if (req.query.beds == 0 && req.query.baths != 0) {
        bedsQuery = {
          [Op.gte]: req.query.beds
        },
        bathsQuery = {
          [Op.eq]: req.query.baths
        }
    } else {
        bedsQuery = {
          [Op.eq]: req.query.beds
        },
        bathsQuery = {
          [Op.eq]: req.query.baths
        }
    }
    Property.findAll({
      // where: req.query
      where: {
        listing_type: req.query.listing_type,
        price: {
          [Op.between]: [req.query.minPrice, req.query.maxPrice]
        },
        beds: bedsQuery,
        baths: bathsQuery
      }
    }).then(properties => {
      res.status(200).send(properties);
      console.log(req.query)
    }).catch(err => {
      console.log(req.query);
      console.log(err);
      res.sendStatus(500);
    })
  }
  
});
  
  
//   .then(properties => {
//     res.status(200).send(properties);
//   }).catch(err => {
//     console.log(err);
//     res.sendStatus(500);
//   });
// })

// @route GET /properties/:id
// @desc Get One Property
// @access Public
propertiesRouter.get("/:id", (req, res) => {
  Property.findByPk(req.params.id)
            .then(property => {
              res.status(200).send(property)
            })
            .catch(err => {
              console.log(err);
              res.sendStatus(500);
            });
})


module.exports = propertiesRouter;