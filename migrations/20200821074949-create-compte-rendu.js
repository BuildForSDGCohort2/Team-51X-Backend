const { v4: uuid } = require('uuid');
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CompteRendus', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: uuid()
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
        references:{
          model:'Users',
          key:'id'
        }
      },
      compteRenduAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      modele: {
        allowNull: true,
        type: Sequelize.STRING
      },
      message: {
        allowNull: false,
        type: Sequelize.JSON
      },
      status: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('CompteRendus');
  }
};