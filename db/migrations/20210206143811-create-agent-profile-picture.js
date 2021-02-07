'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('agent_profile_pictures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      agent_id: {
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
    }).then(() => queryInterface.addIndex('agent_profile_pictures', {fields: ['agent_id'], unique: true}))
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('agent_profile_pictures');
  }
};