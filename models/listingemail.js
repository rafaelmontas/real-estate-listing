'use strict';
module.exports = (sequelize, DataTypes) => {
  const ListingEmail = sequelize.define('ListingEmail', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    }
  }, {
    underscored: true,
    tableName: 'listing_emails'
  });
  ListingEmail.associate = function(models) {
    // associations can be defined here
  };
  return ListingEmail;
};