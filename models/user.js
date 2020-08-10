'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
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