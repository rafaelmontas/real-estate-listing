'use strict';
module.exports = (sequelize, DataTypes) => {
  const ScheduledListingEmail = sequelize.define('ScheduledListingEmail', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    email_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    listing_id: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    underscored: true,
    tableName: 'scheduled_listing_emails',
    indexes: [{fields: ['email_id', 'listing_id']}]
  });
  ScheduledListingEmail.associate = function(models) {
    // associations can be defined here
  };
  return ScheduledListingEmail;
};