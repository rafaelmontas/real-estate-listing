'use strict';
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("montas", salt);

    return queryInterface.bulkInsert('agents', [{
      id: uuidv4(),
      name: 'Rafael Agent',
      email: "rafael@gmail.com",
      phone_number: "8296483530",
      alt_phone_number: "8099293238",
      agent_license: "38544",
      brokerage_name: "RAMC Realty Group",
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('agents', null, {});
  }
};
