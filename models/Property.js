'use strict';
module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define('property', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sector: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    parkings: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    mts: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    lng: {
      type: DataTypes.INTEGER
    },
    lat: {
      type: DataTypes.INTEGER
    },
    listing_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    beds: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    baths: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    property_type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  // Property.associate = function(models) {
  //   associations can be defined here
  // };
  return Property;
};