'use strict';

const {DataTypes} = require('sequelize');
/** @type {import("sequelize-cli").Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'Posts',
            [
                {
                    title: 'Lorem Ipsum',
                    content: 'Some content',
                    image: 'https://cdn-icons-png.flaticon.com/256/7478/7478745.png',
                    userId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: 'Lorem Ipsum',
                    content: 'Some content',
                    image: 'https://cdn-icons-png.flaticon.com/256/7478/7478745.png',
                    userId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: 'Lorem Ipsum',
                    content: 'Some content',
                    image: 'https://cdn-icons-png.flaticon.com/256/7478/7478745.png',
                    userId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Posts', null, {});
    },
};
