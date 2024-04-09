'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const productos = [
      {
        nombre: "Nescafé Gold Espresso 100gr",
        descripcion: "Despierte sus sentidos cada mañana con la sofisticación y el sabor intenso de Nescafé Gold Espresso. Este café instantáneo de 100 gramos, proveniente de la prestigiosa línea Gold y originario de Francia, es la elección perfecta para los amantes del buen café que valoran la calidad y la comodidad.",
        categoriaId: 1,
        imagenes: "1710700030393_img.jpg",
        precio: 15999,
        colorId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: "Café en grano tostado Café Martinez Italiano 1kg",
        descripcion: "Café en grano Tipo Italiano 1kg Variedad de cafe en grano tostado Tipo Italiano de 1kg de Cafe Martinez. Pack reforzado especialmente para conservar el cafe.",
        categoriaId: 1,
        imagenes: "10546-Italiano-500.jpg",
        precio: 15999,
        colorId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: "Cafetera Moulinex Nescafé Dolce Gusto",
        descripcion: " Permite disfrutar de una amplia variedad de bebidas, desde café hasta chocolate, opciones frías y calientes.",
        categoriaId: 3,
        imagenes: "img-cafetera-moulinex.jpg",
        precio: 15999,
        colorId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: "Nescafé Dolce Gusto Cápsulas caja 186g",
        descripcion: "Despierte sus sentidos cada mañana con la sofisticación y el sabor intenso de Nescafé Gold Espresso. Este café instantáneo de 100 gramos, proveniente de la prestigiosa línea Gold y originario de Francia, es la elección perfecta para los amantes del buen café que valoran la calidad y la comodidad.",
        categoriaId: 2,
        imagenes: "Capsula-repuesto.jpg",
        precio: 15999,
        colorId: 4,
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
