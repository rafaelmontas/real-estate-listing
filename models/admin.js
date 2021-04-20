'use strict';
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('admin', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Favor ingresar su nombre."
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email ya existe."
      },
      validate: {
        notEmpty: {
          msg: "Favor ingresar un email."
        },
        isEmail: {
          msg: "Favor ingresar un email valido."
        },
        isLowercase: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Favor ingresar contraseña."
        },
        len: {
          args: [6, 500],
          msg: "Contraseña debe de tener un mínimo de 6 caracteres."
        }
      }
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['email']
      }
    ]
  });
  Admin.associate = function(models) {
    // associations can be defined here
  };
  return Admin;
};