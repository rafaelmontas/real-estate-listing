'use strict';
module.exports = (sequelize, DataTypes) => {
  const Search = sequelize.define('Search', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    province: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sector: {
      type: DataTypes.STRING,
      allowNull: false
    },
    listing_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    min_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    max_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bedrooms: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bathrooms: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    property_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ha_id: DataTypes.UUID,
    user_id: DataTypes.UUID,
    browser: DataTypes.STRING,
    os: DataTypes.STRING,
    platform: DataTypes.STRING,
    is_mobile: DataTypes.BOOLEAN,
    is_mobile_native: DataTypes.BOOLEAN
  }, {
    tableName: 'searches',
    indexes: [{
      fields: ['province', 'sector', 'listing_type', 'min_price', 'max_price', 'bedrooms', 'bathrooms', 'property_type', 'ha_id', 'user_id']
    }]
  });
  Search.associate = function(models) {
    // associations can be defined here
  };
  return Search;
};