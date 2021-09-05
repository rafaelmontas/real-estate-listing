'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('likes', 'browser', {type: Sequelize.STRING}),
      queryInterface.addColumn('likes', 'os', {type: Sequelize.STRING}),
      queryInterface.addColumn('likes', 'platform', {type: Sequelize.STRING}),
      queryInterface.addColumn('likes', 'is_mobile', {type: Sequelize.BOOLEAN}),
      queryInterface.addColumn('likes', 'is_mobile_native', {type: Sequelize.BOOLEAN}),
      queryInterface.addColumn('searches', 'browser', {type: Sequelize.STRING}),
      queryInterface.addColumn('searches', 'os', {type: Sequelize.STRING}),
      queryInterface.addColumn('searches', 'platform', {type: Sequelize.STRING}),
      queryInterface.addColumn('searches', 'is_mobile', {type: Sequelize.BOOLEAN}),
      queryInterface.addColumn('searches', 'is_mobile_native', {type: Sequelize.BOOLEAN}),
      queryInterface.addColumn('listing_views', 'browser', {type: Sequelize.STRING}),
      queryInterface.addColumn('listing_views', 'os', {type: Sequelize.STRING}),
      queryInterface.addColumn('listing_views', 'platform', {type: Sequelize.STRING}),
      queryInterface.addColumn('listing_views', 'is_mobile', {type: Sequelize.BOOLEAN}),
      queryInterface.addColumn('listing_views', 'is_mobile_native', {type: Sequelize.BOOLEAN})
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('likes', 'browser', {}),
      queryInterface.removeColumn('likes', 'os', {}),
      queryInterface.removeColumn('likes', 'platform', {}),
      queryInterface.removeColumn('likes', 'is_mobile', {}),
      queryInterface.removeColumn('likes', 'is_mobile_native', {}),
      queryInterface.removeColumn('searches', 'browser', {}),
      queryInterface.removeColumn('searches', 'os', {}),
      queryInterface.removeColumn('searches', 'platform', {}),
      queryInterface.removeColumn('searches', 'is_mobile', {}),
      queryInterface.removeColumn('searches', 'is_mobile_native', {}),
      queryInterface.removeColumn('listing_views', 'browser', {}),
      queryInterface.removeColumn('listing_views', 'os', {}),
      queryInterface.removeColumn('listing_views', 'platform', {}),
      queryInterface.removeColumn('listing_views', 'is_mobile', {}),
      queryInterface.removeColumn('listing_views', 'is_mobile_native', {})
    ])
  }
};
