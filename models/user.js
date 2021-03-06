'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
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
    },
    reset_token: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['email']
      }
    ]
  });
  // User.associate = function(models) {
  //   User.hasMany(models.property, {
  //     onDelete: "SET DEFAULT",
  //     onUpdate: "SET DEFAULT"
  //   })
  // };
  return User;
};