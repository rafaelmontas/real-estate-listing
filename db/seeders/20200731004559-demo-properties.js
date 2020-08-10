'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('properties', [{
        province: "Distrito Nacional",
        province_id: 1,
        sector: "Ensanche Naco",
        sector_id: 42,
        listing_price: 95000,
        parking_spaces: 1,
        square_meters: 90,
        stories: null,
        year_built: null,
        lng: -69.922225,
        lat: 18.472233,
        listing_type: "For Sale",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        bedrooms: 2,
        bathrooms: 1,
        half_bathrooms: 1,
        street_name: "Dr. Fabio Mota",
        street_number: 9,
        property_type: "Apartment",
        new_construction: true,
        listing_status: "Pending",
        status_change_timestamp: null,
        close_price: null,
        close_date: null,
        agent_id: null,
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        province: "Distrito Nacional",
        province_id: 1,
        sector: "Ensanche Naco",
        sector_id: 42,
        listing_price: 105000,
        parking_spaces: 2,
        square_meters: 95,
        stories: null,
        year_built: null,
        lng: -69.932690,
        lat: 18.471365,
        listing_type: "For Sale",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        bedrooms: 2,
        bathrooms: 2,
        half_bathrooms: 1,
        street_name: "Frank Felix Miranda",
        street_number: 30,
        property_type: "Apartment",
        new_construction: false,
        listing_status: "Pending",
        status_change_timestamp: null,
        close_price: null,
        close_date: null,
        agent_id: 1,
        user_id: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('properties', null, {});
  }
};
