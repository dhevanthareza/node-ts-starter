'use strict';
const moment = require('moment');
const bcrypt = require('bcrypt-nodejs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'user',
        fullname: 'User',
        password: bcrypt.hashSync('secret'),
        createdAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      }, {
        username: 'admin',
        fullname: 'Admin',
        password: bcrypt.hashSync('secret'),
        createdAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Users', null, {});
  }
};
