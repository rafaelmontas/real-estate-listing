'use strict';
module.exports = (sequelize, DataTypes) => {
  const Agent = sequelize.define('agent', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Favor ingresar su nombre"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email ya existe"
      },
      validate: {
        notEmpty: {
          msg: "Favor ingresar un email"
        },
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
        notEmpty: {
          msg: "Favor ingresar contraseña"
        },
        len: {
          args: [6, 500],
          msg: "Contraseña debe de tener un mínimo de 6 caracteres"
        }
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