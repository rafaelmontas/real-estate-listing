'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.removeConstraint('searches', 'searches_user_id_fkey', { transaction }),
      await queryInterface.addConstraint('searches', {
        type: 'foreign key',
        fields: ['user_id'],
        name: 'searches_user_id_fkey',
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
      await queryInterface.removeConstraint('searches', 'searches_user_id_fkey', { transaction }),
      await queryInterface.addConstraint('searches', {
        type: 'foreign key',
        fields: ['user_id'],
        name: 'searches_user_id_fkey',
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
