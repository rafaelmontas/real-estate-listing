'use strict';
module.exports = (sequelize, DataTypes) => {
  const Agent = sequelize.define('agent', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    alt_phone_number: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Agent.associate = function(models) {
    // associations can be defined here
  };
  return Agent;
};