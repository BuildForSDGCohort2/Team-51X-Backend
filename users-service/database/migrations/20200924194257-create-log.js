'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Logs', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      eventId: {
        allowNull: false,
        type: Sequelize.UUID,
        references:{
          model:'Events',
          key:'id'
        }
      }, 
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
        references:{
          model:'Users',
          key:'id'
        }
      },
      userAgent: {
        allowNull: true,
        type: Sequelize.JSON
      },
      ipAdress: {
        allowNull: true,
        type: Sequelize.STRING
      },
      geolocation: {
        allowNull: true,
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Logs');
  }
};