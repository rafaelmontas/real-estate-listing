'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('properties', [{
      title: 'Apartamento en Naco',
      imgSrc: "https://s3.amazonaws.com/real.estate.dom/apart.jpg",
      sector: 'Naco, Distrito Nacional',
      price: 95000,
      parkings: 2,
      mts: 95,
      lng: -69.922225,
      lat: 18.472233,
      listing_type: "sell",
      description: "This is the description....",
      beds: 2,
      baths: 1,
      address: "C/ Dr. Fabio Mota #9",
      property_type: "Apartamento",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Apartamento en Naco #2',
      imgSrc: "https://s3.amazonaws.com/real.estate.dom/metro.jpg",
      sector: 'Naco, Distrito Nacional',
      price: 105000,
      parkings: 2,
      mts: 105,
      lng: -69.922347,
      lat: 18.471853,
      listing_type: "sell",
      description: "This is the description.... #2",
      beds: 2,
      baths: 2,
      address: "C/ Dr. Fabio Mota #9",
      property_type: "Apartamento",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Apartamento en Naco #3',
      imgSrc: "https://s3.amazonaws.com/real.estate.dom/boat.jpg",
      sector: 'Naco, Distrito Nacional',
      price: 120000,
      parkings: 3,
      mts: 105,
      lng: -69.932690,
      lat: 18.471365,
      listing_type: "sell",
      description: "This is the description.... #3",
      beds: 3,
      baths: 2,
      address: "C/ Dr. Fabio Mota #9",
      property_type: "Apartamento",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('properties', null, {});
  }
};
