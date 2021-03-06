'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Departements', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      institutionId: {
        type: Sequelize.UUID,
        references:{
          model:'Institutions',
          key:'id'
        }
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT
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
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Departements');
  }
};