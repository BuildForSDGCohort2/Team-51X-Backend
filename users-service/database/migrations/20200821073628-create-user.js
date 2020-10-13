'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      roleId: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED,
        references:{
          model:'Roles',
          key:'id'
        }
      },
      prenom: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      nom: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        allowNull: false,
        type: Sequelize.CHAR(64)
      },
      phoneNumber: {
        allowNull: true,
        type: Sequelize.STRING,
        unique: true
      },
      verified: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      refreshToken: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      status: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      avatar: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      expiresAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      sessionAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};