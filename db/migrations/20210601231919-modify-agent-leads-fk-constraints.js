'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.removeConstraint('agent_leads', 'agent_leads_agent_id_fkey', { transaction }),
      await queryInterface.removeConstraint('agent_leads', 'agent_leads_listing_id_fkey', { transaction }),
      await queryInterface.removeConstraint('agent_leads', 'agent_leads_user_id_fkey', { transaction }),
      await queryInterface.addConstraint('agent_leads', {
        type: 'foreign key',
        fields: ['agent_id'],
        name: 'agent_leads_agent_id_fkey',
        references: {
          table: 'agents',
          field: 'id',
        },
        onDelete: 'set null',
        onUpdate: 'cascade',
        transaction
      }),
      await queryInterface.addConstraint('agent_leads', {
        type: 'foreign key',
        fields: ['listing_id'],
        name: 'agent_leads_listing_id_fkey',
        references: {
          table: 'properties',
          field: 'id',
        },
        onDelete: 'set null',
        onUpdate: 'cascade',
        transaction
      }),
      await queryInterface.addConstraint('agent_leads', {
        type: 'foreign key',
        fields: ['user_id'],
        name: 'agent_leads_user_id_fkey',
        references: {
          table: 'users',
          field: 'id',
        },
        onDelete: 'set null',
        onUpdate: 'cascade',
        transaction
      })
      await transaction.commit()
    } catch(error) {
      await transaction.rollback()
      throw error
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.removeConstraint('agent_leads', 'agent_leads_agent_id_fkey', { transaction }),
      await queryInterface.removeConstraint('agent_leads', 'agent_leads_listing_id_fkey', { transaction }),
      await queryInterface.removeConstraint('agent_leads', 'agent_leads_user_id_fkey', { transaction }),
      await queryInterface.addConstraint('agent_leads', {
        type: 'foreign key',
        fields: ['agent_id'],
        name: 'agent_leads_agent_id_fkey',
        references: {
          table: 'agents',
          field: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        transaction
      }),
      await queryInterface.addConstraint('agent_leads', {
        type: 'foreign key',
        fields: ['listing_id'],
        name: 'agent_leads_listing_id_fkey',
        references: {
          table: 'properties',
          field: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        transaction
      }),
      await queryInterface.addConstraint('agent_leads', {
        type: 'foreign key',
        fields: ['user_id'],
        name: 'agent_leads_user_id_fkey',
        references: {
          table: 'users',
          field: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        transaction
      })
      await transaction.commit()
    } catch(error) {
      await transaction.rollback()
      throw error
    }
  }
};
