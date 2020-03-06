'use strict';
const moment = require('moment');
const bcrypt = require('bcrypt-nodejs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Role', [
      {
        id: 1,
        name: 'admin',
        text: 'Admin',
        createdAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        id: 2,
        name: 'teacher',
        text: 'Teacher',
        createdAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        id: 3,
        name: 'student',
        text: 'Student',
        createdAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        id: 4,
        name: 'studentFree',
        text: 'Free Student',
        parentId: 3,
        createdAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        id: 5,
        name: 'studentPremium',
        text: 'Premium Student',
        parentId: 3,
        createdAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Role', null, {});
  }
};
