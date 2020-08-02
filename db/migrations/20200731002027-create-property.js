'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('properties', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      province: {
        type: Sequelize.STRING,
        allowNull: false
      },
      province_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      sector: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sector_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      listing_price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      parking_spaces: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      square_meters: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      stories: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      year_built: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      lng: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      lat: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      listing_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      bedrooms: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      bathrooms: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      half_bathrooms: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      street_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      street_number: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      property_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      new_construction: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      listing_status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Pending"
      },
      status_change_timestamp: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      close_price: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      close_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      agent_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('properties');
  }
};
