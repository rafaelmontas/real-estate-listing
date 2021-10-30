'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('properties', 'listing_address', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('properties', 'listing_address', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};
