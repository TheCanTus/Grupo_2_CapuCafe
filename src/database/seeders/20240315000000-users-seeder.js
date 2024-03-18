'use strict';
const bcrypt = require('bcrypt');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const usuarios = [
            {
                nombre: "Mariano",
                apellido: "Cantos",
                email: "joaquincantos@hotmail.com",
                password: await bcrypt.hashSync("123123", 10),
                avatar: "1705415990327_img.jpg",
                rol: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];

        await queryInterface.bulkInsert('Usuarios', usuarios, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Usuarios', null, {});
    }
};
