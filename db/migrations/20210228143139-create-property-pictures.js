'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('property_pictures', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      original_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      encoding: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mimetype: {
        type: Sequelize.STRING,
        allowNull: false
      },
      size: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      bucket: {
        type: Sequelize.STRING,
        allowNull: false
      },
      key: {
        type: Sequelize.STRING,
        allowNull: false
      },
      acl: {
        type: Sequelize.STRING,
        allowNull: false
      },
      storage_class: {
        type: Sequelize.STRING,
        allowNull: false
      },
      location: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      label: {
        type: Sequelize.STRING,
        allowNull: true
      },
      property_id: {
        type: Sequelize.UUID,
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
    }).then(() => queryInterface.addIndex('property_pictures', {fields: ['property_id']}));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('property_pictures');
  }
};