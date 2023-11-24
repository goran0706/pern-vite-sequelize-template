'use strict';

const {now} = require('sequelize/lib/utils');
/** @type {import("sequelize-cli").Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'Users',
            [
                {
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john.doe@gmail.com',
                    passwordHashed: 'john',
                    gender: 'm',
                    dateOfBirth: '1990-10-10',
                    contactNumber: '123 123 123',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    firstName: 'Jane',
                    lastName: 'Doe',
                    email: 'jane.doe@gmail.com',
                    passwordHashed: 'jane',
                    gender: 'f',
                    dateOfBirth: '1990-10-10',
                    contactNumber: '123 123 123',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Users', null, {});
    },
};
