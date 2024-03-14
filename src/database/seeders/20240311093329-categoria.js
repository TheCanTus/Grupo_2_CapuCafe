'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Crear datos de demostración para la tabla de categorías
    await queryInterface.bulkInsert('categorias', [
      {
        categoria: 'Cafe',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoria: 'Repuestos',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoria: 'Cafeteras',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      // Puedes añadir más objetos de categoría aquí si lo deseas
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Eliminar los datos de demostración de la tabla de categorías
    await queryInterface.bulkDelete('categorias', null, {});
  }
};
