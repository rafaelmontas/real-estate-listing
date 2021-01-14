'use strict';
module.exports = (sequelize, DataTypes) => {
  const Agent = sequelize.define('agent', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email ya existe"
      },
      validate: {
        notEmpty: true,
        isEmail: {
          msg: "Favor ingresar un email valido"
        },
        isLowercase: true
      }
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    alt_phone_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 6
      }
    },
    agent_license: {
      type: DataTypes.STRING,
      allowNull: true
    },
    brokerage_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {});
  Agent.associate = function(models) {
    // associations can be defined here
  };
  return Agent;
};