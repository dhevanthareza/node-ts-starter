'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER,
      },
      phone: {
        type: Sequelize.STRING,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
      },
      fullname: {
        type: Sequelize.STRING,
      },
      RoleId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Role',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      createdBy: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedBy: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      deletedBy: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
    });
    await queryInterface.addConstraint('User', ['createdBy'], {
      type: 'foreign key',
      references: {
        table: 'User',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('User', ['updatedBy'], {
      type: 'foreign key',
      references: {
        table: 'User',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    return queryInterface.addConstraint('User', ['deletedBy'], {
      type: 'foreign key',
      references: {
        table: 'User',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('User');
  },
};
