'use strict';
module.exports = (sequelize, DataTypes) => {
  const AgentProfilePicture = sequelize.define('AgentProfilePicture', {
    original_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    encoding: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mimetype: {
      type: DataTypes.STRING,
      allowNull: false
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bucket: {
      type: DataTypes.STRING,
      allowNull: false
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false
    },
    acl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    storage_class: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    agent_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'agent_profile_pictures',
    indexes: [
      {
        unique: true,
        fields: ['agent_id']
      }
    ]
  });
  // AgentProfilePicture.associate = function(models) {
  //   associations can be defined here
  // };
  return AgentProfilePicture;
};