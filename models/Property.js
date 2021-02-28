'use strict';
module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define('property', {
    province: {
      type: DataTypes.STRING,
      allowNull: true
    },
    province_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    sector: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sector_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    listing_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    parking_spaces: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    square_meters: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stories: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    year_built: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    listing_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    bedrooms: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bathrooms: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    half_bathrooms: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    street_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    street_number: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    property_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    new_construction: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    listing_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    status_change_timestamp: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    close_price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    close_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    agent_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {});
  // Property.associate = function(models) {
  //   Property.belongsTo(models.user, {
  //     foreignKey: "user_id"
  //   })
  // };
  return Property;
};