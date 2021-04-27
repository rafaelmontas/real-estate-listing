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
    }
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