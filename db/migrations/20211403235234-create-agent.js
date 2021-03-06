'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('agents', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phone_number: {
        allowNull: true,
        type: Sequelize.STRING
      },
      alt_phone_number: {
        allowNull: true,
        type: Sequelize.STRING
      },
      agent_license: {
        allowNull: true,
        type: Sequelize.STRING
      },
      brokerage_name: {
        allowNull: true,
        type: Sequelize.STRING
      },
      status_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      reset_token: {
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => queryInterface.addIndex('agents', {fields: ['email'], unique: true}))
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('agents');
  }
};