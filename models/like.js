'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('like', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    listing_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    browser: DataTypes.STRING,
    os: DataTypes.STRING,
    platform: DataTypes.STRING,
    is_mobile: DataTypes.BOOLEAN,
    is_mobile_native: DataTypes.BOOLEAN,
    ip_address: DataTypes.STRING,
    udid: DataTypes.STRING
  }, {
    indexes: [
      {
        fields: ['listing_id', 'user_id']
      }
    ]
  });
  Like.associate = function(models) {
    // associations can be defined here
    // Like.belongsTo(models.user, {foreignKey: 'user_id'});
    // Like.belongsTo(models.property, {foreignKey: 'listing_id'});
  };
  return Like;
};