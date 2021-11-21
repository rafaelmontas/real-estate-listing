'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('scheduled_listing_emails', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      email_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model:'listing_emails',
          key:'id'
        },
        onDelete: 'set null',
        onUpdate: 'cascade'
      },
      listing_id: {
        type: Sequelize.UUID,
        allowNull:false,
        references: {
          model:'properties',
          key:'id'
        },
        onDelete: 'set null',
        onUpdate: 'cascade'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => queryInterface.addIndex('scheduled_listing_emails', {fields: ['email_id', 'listing_id']}));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('scheduled_listing_emails');
  }
};