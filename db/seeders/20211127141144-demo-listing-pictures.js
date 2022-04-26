'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: (queryInterface, Sequelize) => {
      // Add altering commands here.
      // Return a promise to correctly handle asynchronicity.

      return queryInterface.bulkInsert('property_pictures', [{
        id: uuidv4(),
        original_name: 'test-picture',
        encoding: 'utg',
        mimetype: '8m',
        size: 5,
        bucket: 'us',
        key: 'ok',
        acl: 'ok',
        storage_class: 'standard',
        location: 'https://property-pictures-production.s3.us-east-2.amazonaws.com/e10dca35-7831-44a8-9b40-d4f1dac6ef61-1637169146020-promocion-ii.png',
        label: 'test',
        property_id: '139ce6b7-eb09-4e25-8429-a70b324a0ee0',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        original_name: 'test-picture',
        encoding: 'utg',
        mimetype: '8m',
        size: 5,
        bucket: 'us',
        key: 'ok',
        acl: 'ok',
        storage_class: 'standard',
        location: 'https://property-pictures-production.s3.amazonaws.com/d97bf6a1-1423-4321-83e6-08c45835cfb2-1633549717663-eb-fl4507-%282%29.png',
        label: 'test',
        property_id: '139ce6b7-eb09-4e25-8429-a70b324a0ee0',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        original_name: 'test-picture',
        encoding: 'utg',
        mimetype: '8m',
        size: 5,
        bucket: 'us',
        key: 'ok',
        acl: 'ok',
        storage_class: 'standard',
        location: 'https://property-pictures-production.s3.us-east-2.amazonaws.com/3f7adff7-1b52-4f38-a274-47ed146ab894-1631284035567-presentacion-comercial-vista-vento_page25_image19.jpg',
        label: 'test',
        property_id: '239ce6b7-eb09-4e25-8429-a70b324a0ee0',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        original_name: 'test-picture',
        encoding: 'utg',
        mimetype: '8m',
        size: 5,
        bucket: 'us',
        key: 'ok',
        acl: 'ok',
        storage_class: 'standard',
        location: 'https://property-pictures-production.s3.us-east-2.amazonaws.com/65d8510d-f395-4ef5-a2b2-9886a353eb16-1631022408224-610aa090-e6c6-4c8d-bc63-afb28dcc57da.jpg',
        label: 'test',
        property_id: '239ce6b7-eb09-4e25-8429-a70b324a0ee0',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        original_name: 'test-picture',
        encoding: 'utg',
        mimetype: '8m',
        size: 5,
        bucket: 'us',
        key: 'ok',
        acl: 'ok',
        storage_class: 'standard',
        location: 'https://property-pictures-production.s3.us-east-2.amazonaws.com/30711ba3-0666-45c0-ac5d-a2f12d123644-1630526882218-15.jpeg',
        label: 'test',
        property_id: '339ce6b7-eb09-4e25-8429-a70b324a0ee0',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        original_name: 'test-picture',
        encoding: 'utg',
        mimetype: '8m',
        size: 5,
        bucket: 'us',
        key: 'ok',
        acl: 'ok',
        storage_class: 'standard',
        location: 'https://property-pictures-production.s3.us-east-2.amazonaws.com/babba31f-0439-4ebf-8188-7df655249ef9-1625802927974-1-website-and-ecomerces-1170-x-786-price.jpg',
        label: 'test',
        property_id: '339ce6b7-eb09-4e25-8429-a70b324a0ee0',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        original_name: 'test-picture',
        encoding: 'utg',
        mimetype: '8m',
        size: 5,
        bucket: 'us',
        key: 'ok',
        acl: 'ok',
        storage_class: 'standard',
        location: 'https://property-pictures-production.s3.amazonaws.com/c0aa4222-8479-43d2-8078-5fcdfa84edd1-1623859935768-whatsapp-image-2021-06-16-at-10.35.06-am.jpeg',
        label: 'test',
        property_id: '439ce6b7-eb09-4e25-8429-a70b324a0ee0',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        original_name: 'test-picture',
        encoding: 'utg',
        mimetype: '8m',
        size: 5,
        bucket: 'us',
        key: 'ok',
        acl: 'ok',
        storage_class: 'standard',
        location: 'https://property-pictures-production.s3.us-east-2.amazonaws.com/89c20a71-c421-40b8-8781-1b45598ea2d0-1624108615081-210524-brochure-colinas-04-low-resolution-%282%29_page32_image188.png',
        label: 'test',
        property_id: '439ce6b7-eb09-4e25-8429-a70b324a0ee0',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        original_name: 'test-picture',
        encoding: 'utg',
        mimetype: '8m',
        size: 5,
        bucket: 'us',
        key: 'ok',
        acl: 'ok',
        storage_class: 'standard',
        location: 'https://property-pictures-production.s3.amazonaws.com/072bdc11-615a-4e40-894a-fb3cdb3c44fe-1623435339044-whatsapp-image-2021-06-11-at-12.23.45-pm.jpeg',
        label: 'test',
        property_id: '539ce6b7-eb09-4e25-8429-a70b324a0ee0',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        original_name: 'test-picture',
        encoding: 'utg',
        mimetype: '8m',
        size: 5,
        bucket: 'us',
        key: 'ok',
        acl: 'ok',
        storage_class: 'standard',
        location: 'https://property-pictures-production.s3.us-east-2.amazonaws.com/7e3855b3-d6e4-44c6-9758-e96fb71cc9f1-1623245109362-7.jpeg',
        label: 'test',
        property_id: '539ce6b7-eb09-4e25-8429-a70b324a0ee0',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        original_name: 'test-picture',
        encoding: 'utg',
        mimetype: '8m',
        size: 5,
        bucket: 'us',
        key: 'ok',
        acl: 'ok',
        storage_class: 'standard',
        location: 'https://property-pictures-production.s3.us-east-2.amazonaws.com/77a39060-391f-4028-b96d-420a99335d4f-1623181326113-presentacion-de-inversionistas-tempranos---icono-by-pedralbes_page31_image14.jpg',
        label: 'test',
        property_id: '639ce6b7-eb09-4e25-8429-a70b324a0ee0',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        original_name: 'test-picture',
        encoding: 'utg',
        mimetype: '8m',
        size: 5,
        bucket: 'us',
        key: 'ok',
        acl: 'ok',
        storage_class: 'standard',
        location: 'https://property-pictures-production.s3.us-east-2.amazonaws.com/00770a07-04ab-4802-9761-41cb836913fa-1622820569731-ppt-montichiello-actualizado%271-_page18_image16.jpg',
        label: 'test',
        property_id: '639ce6b7-eb09-4e25-8429-a70b324a0ee0',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
    
      // Add reverting commands here.
      // Return a promise to correctly handle asynchronicity.

      return queryInterface.bulkDelete('property_pictures', null, {});
  
  }
};
