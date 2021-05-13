'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('searches', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      province: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sector: {
        type: Sequelize.STRING,
        allowNull: false
      },
      listing_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      min_price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      max_price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      bedrooms: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      bathrooms: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      property_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ha_id: {
        type: Sequelize.UUID
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model:'users',
          key:'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => queryInterface.addIndex('searches', {
      fields: ['province', 'sector', 'listing_type', 'min_price', 'max_price', 'bedrooms', 'bathrooms', 'property_type', 'ha_id', 'user_id']
    }));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('searches');
  }
};