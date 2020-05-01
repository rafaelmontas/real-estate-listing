const Sequelize = require('sequelize');
const db = require('../config/database');

const Property = db.define('property', {
  title: {
    type: Sequelize.STRING
  },
  sector: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.INTEGER
  },
  parkings: {
    type: Sequelize.INTEGER
  },
  mts: {
    type: Sequelize.INTEGER
  },
  lng: {
    type: Sequelize.INTEGER
  },
  lat: {
    type: Sequelize.INTEGER
  },
  listing_type: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  beds: {
    type: Sequelize.INTEGER
  },
  baths: {
    type: Sequelize.INTEGER
  },
  address: {
    type: Sequelize.STRING
  },
  property_type: {
    type: Sequelize.STRING
  },
})

module.exports = Property;