'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('agents', [{
      name: 'Antonio Agent',
      email: "antonio@gmail.com",
      phone_number: "8296483530",
      password: "123",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('agents', null, {});
  }
};
