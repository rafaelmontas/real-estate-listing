'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('likes', 'udid', {type: Sequelize.STRING}),
      queryInterface.addColumn('likes', 'ip_address', {type: Sequelize.STRING}),
      queryInterface.addColumn('searches', 'udid', {type: Sequelize.STRING}),
      queryInterface.addColumn('searches', 'ip_address', {type: Sequelize.STRING}),
      queryInterface.addColumn('listing_views', 'udid', {type: Sequelize.STRING}),
      queryInterface.addColumn('listing_views', 'ip_address', {type: Sequelize.STRING}),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('likes', 'udid', {}),
      queryInterface.removeColumn('likes', 'ip_address', {}),
      queryInterface.removeColumn('searches', 'udid', {}),
      queryInterface.removeColumn('searches', 'ip_address', {}),
      queryInterface.removeColumn('listing_views', 'udid', {}),
      queryInterface.removeColumn('listing_views', 'ip_address', {}),
    ])
  }
};
