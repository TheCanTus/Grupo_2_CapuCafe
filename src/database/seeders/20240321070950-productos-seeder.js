'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.sequelize.query("INSERT INTO categorias (categoria, createdAt, updatedAt) VALUES ('Cafe', NOW(), NOW());");
    await queryInterface.sequelize.query("INSERT INTO colores (color, createdAt, updatedAt) VALUES ('Cafe', NOW(), NOW());");


    const productos = [
      {
        nombre: "Nescafé Gold Espresso 100gr",
        descripcion: "Despierte sus sentidos cada mañana con la sofisticación y el sabor intenso de Nescafé Gold Espresso. Este café instantáneo de 100 gramos, proveniente de la prestigiosa línea Gold y originario de Francia, es la elección perfecta para los amantes del buen café que valoran la calidad y la comodidad.",
        categoriaId: 1,
        imagenes: "1710700030393_img.jpg",
        precio: 15999,
        colorId: 'Marron',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: "Café en grano tostado Café Martinez Italiano 1kg",
        descripcion: "Café en grano Tipo Italiano 1kg Variedad de cafe en grano tostado Tipo Italiano de 1kg de Cafe Martinez. Pack reforzado especialmente para conservar el cafe.",
        categoriaId: 1,
        imagenes: "1710700030393_img.jpg",
        precio: 15999,
        colorId: 'Marron',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: "Cafe Martinez molido tostado moka frutado 500g",
        descripcion: "Despierte sus sentidos cada mañana con la sofisticación y el sabor intenso de Nescafé Gold Espresso. Este café instantáneo de 100 gramos, proveniente de la prestigiosa línea Gold y originario de Francia, es la elección perfecta para los amantes del buen café que valoran la calidad y la comodidad.",
        categoriaId: 1,
        imagenes: "1710700030393_img.jpg",
        precio: 15999,
        colorId: 'Marron',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: "Cafe Martinez molido tostado moka frutado 500g",
        descripcion: "Despierte sus sentidos cada mañana con la sofisticación y el sabor intenso de Nescafé Gold Espresso. Este café instantáneo de 100 gramos, proveniente de la prestigiosa línea Gold y originario de Francia, es la elección perfecta para los amantes del buen café que valoran la calidad y la comodidad.",
        categoriaId: 1,
        imagenes: "1710700030393_img.jpg",
        precio: 15999,
        colorId: 'Marron',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];

    await queryInterface.bulkInsert('productos', productos, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('productos', null, {});
    await queryInterface.bulkDelete('categorias', null, {});
    await queryInterface.bulkDelete('colores', null, {});

  }
};
