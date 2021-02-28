'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('property_amenities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      half_bathrooms: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      air_conditioner: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      game_zone: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      laundry_room: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      social_area: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      elevator: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      balcony: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      family_room: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      shared_gas: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      gym: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      service_room: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      jacuzzy: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      lobby: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      swimming_pool: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      marble_floor: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      power_plant: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      security: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      walk_in_closet: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      furnished: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      security_system: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      hardwood_floor: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      property_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => queryInterface.addIndex('property_amenities', {fields: ['property_id'], unique: true}));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('property_amenities');
  }
};