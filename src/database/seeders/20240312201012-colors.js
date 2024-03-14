'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Crear datos de demostración para la tabla de colores
    await queryInterface.bulkInsert('colores', [
      {
        color: 'Rojo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        color: 'Verde',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        color: 'Azul',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      // Puedes añadir más objetos de color aquí si lo deseas
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Eliminar los datos de demostración de la tabla de colores
    await queryInterface.bulkDelete('colores', null, {});
  }
};
