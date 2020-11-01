'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      allowNull: true
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
        }
      }
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {});
  // User.associate = function(models) {
  //   User.hasMany(models.property, {
  //     onDelete: "SET DEFAULT",
  //     onUpdate: "SET DEFAULT"
  //   })
  // };
  return User;
};