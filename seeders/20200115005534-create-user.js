'use strict';
const moment = require('moment');
const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'User',
      [
        {
          id: 1,
          email: 'developer@gmail.com',
          fullname: 'Admin Ganteng',
          phone: '081226292132',
          password: bcrypt.hashSync('secret', 10),
          RoleId: 1,
          createdAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          updatedAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User', null, {});
  },
};
