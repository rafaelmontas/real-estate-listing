'use strict';
module.exports = (sequelize, DataTypes) => {
  const ListingView = sequelize.define('ListingView', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    listing_id: DataTypes.UUID,
    user_id: DataTypes.UUID,
    agent_id: DataTypes.UUID,
    ha_id: DataTypes.UUID
  }, {
    tableName: 'listing_views',
    indexes: [{fields: ['listing_id', 'user_id', 'agent_id', 'ha_id']}]
  });
  ListingView.associate = function(models) {
    // associations can be defined here
  };
  return ListingView;
};